// src/app/api/send-email/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.RESEND_TO_EMAIL,
      reply_to: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error('Error sending email:', error);
      return new Response("Failed to send email", { status: 500 });
    }

    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Email send failed:", error);
    return new Response("Failed to send email", { status: 500 });
  }
}
