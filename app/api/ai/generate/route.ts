import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { prompt, workspaceId } = await req.json();

    if (!prompt || !workspaceId) {
      return NextResponse.json({ error: 'Missing prompt or workspaceId' }, { status: 400 });
    }

    // 1. Check credits
    const [workspace] = await sql`SELECT credits FROM workspaces WHERE id = ${workspaceId}`;

    if (!workspace || workspace.credits < 1) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
    }

    // 2. Call Gemini API (Mocking real integration for this environment)
    // Replace this with actual Google Nano Banana / Gemini API call
    console.log('Generating image with prompt:', prompt);

    // Simulating API latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock Response
    const imageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==";

    // 3. Deduct credit
    await sql`UPDATE workspaces SET credits = credits - 1 WHERE id = ${workspaceId}`;

    // 4. Log to ledger
    await sql`
      INSERT INTO credit_ledger (workspace_id, amount, description)
      VALUES (${workspaceId}, -1, 'AI Image Generation')
    `;

    return NextResponse.json({
      image: {
        imageBytes: imageBase64,
        mimeType: "image/png"
      }
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
