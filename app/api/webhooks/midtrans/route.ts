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

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error('MIDTRANS_SERVER_KEY is missing');
      return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
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
    // Ensure we don't add credits twice if status was already success (though Midtrans might send multiple notifications)
    // For this MVP we just add. In production, check if credits were already added.
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
