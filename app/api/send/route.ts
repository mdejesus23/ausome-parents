import { Resend } from 'resend';
import { EmailTemplate } from '@/app/_ui/email-template';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, token } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 },
      );
    }

    // Verify with Google
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      },
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Ausome Parents <contact@mail.ausome-parents.melnerdz.com>',
      to: ['ausomeparents23@gmail.com'],
      subject: 'Ausome Parents Contact Form',
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error?.message || 'Failed to send email.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent!', data });
  } catch (error) {
    return NextResponse.json(
      // { success: false, error: `Server error: ${errorMessage}` },
      { success: false, error: `Server error: Please try again.` },
      { status: 500 },
    );
  }
}
