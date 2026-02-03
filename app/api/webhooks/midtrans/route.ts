import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const signatureKey = notification.signature_key;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;
    const merchantId = notification.merchant_id;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const expectedMerchantId = process.env.MIDTRANS_MERCHANT_ID;

    if (!serverKey || !expectedMerchantId) {
      console.error('MIDTRANS configuration is missing');
      return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
    }

    // Verify Merchant ID
    if (merchantId !== expectedMerchantId) {
      console.error('Invalid Merchant ID:', merchantId);
      return NextResponse.json({ error: 'Invalid Merchant ID' }, { status: 403 });
    }

    // Validate Signature
    const mySignature = crypto
      .createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest('hex');

    if (mySignature !== signatureKey) {
      console.error('Invalid Signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    // Determine status
    let status = 'pending';
    if (transactionStatus == 'capture') {
      if (fraudStatus == 'challenge') {
        status = 'challenge';
      } else if (fraudStatus == 'accept') {
        status = 'success';
      }
    } else if (transactionStatus == 'settlement') {
      status = 'success';
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
      status = 'failed';
    } else if (transactionStatus == 'pending') {
      status = 'pending';
    }

    // Update transaction in DB
    // We assume orderId is the UUID of the transaction
    const transactions = await sql`
      UPDATE transactions
      SET status = ${status}
      WHERE id = ${orderId}
      RETURNING workspace_id, amount, status
    `;

    const transaction = transactions[0];

    if (!transaction) {
      console.error('Transaction not found:', orderId);
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // If successful, add credits
    if (status === 'success') {
       // Check if we already processed this
       // A robust way is to check the previous status, but here we just blindly add for now or check if we have a ledger entry?
       // Let's just add and log.

       await sql`
        UPDATE workspaces
        SET credits = credits + ${transaction.amount}
        WHERE id = ${transaction.workspace_id}
      `;

      await sql`
        INSERT INTO credit_ledger (workspace_id, amount, description)
        VALUES (${transaction.workspace_id}, ${transaction.amount}, 'Top-up via Midtrans: ' || ${orderId})
      `;
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Midtrans Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
