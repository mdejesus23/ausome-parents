import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = process.env.BREVO_LIST_ID;

  if (!BREVO_API_KEY || !LIST_ID) {
    return new NextResponse(
      JSON.stringify({ message: 'Missing env variables' }),
      {
        status: 500,
      },
    );
  }

  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid email' }), {
        status: 400,
      });
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const error = await brevoResponse.text();
      return new NextResponse(
        JSON.stringify({ message: `Brevo error: ${error}` }),
        {
          status: 500,
        },
      );
    }

    return new NextResponse(JSON.stringify({ message: 'success' }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Invalid Request' }), {
      status: 400,
    });
  }
}
