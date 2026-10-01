import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, botcheck } = body;

    // 1. Honeypot Spam Protection: If hidden bot field is filled, silently discard
    if (botcheck) {
      console.warn('⚠️ Spam bot submission intercepted and dropped.');
      return NextResponse.json(
        { success: true, message: 'Message sent successfully.' },
        { status: 200 }
      );
    }

    // 2. Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: 'Please enter a message of at least 5 characters.' },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = (phone || '').trim();
    const cleanMessage = message.trim();

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure = smtpPort === 465;
    const emailUser = process.env.SMTP_USER || process.env.EMAIL_USER || 'info@nairat.net';
    const emailPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'info@nairat.net';

    // 3. Dev Mode vs Production fallback
    if (!emailPass || emailPass.trim() === '') {
      console.warn('⚠️ [SMTP] No EMAIL_PASS / SMTP_PASS found in environment variables.');
      
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            code: 'SMTP_UNCONFIGURED',
            message:
              'Email dispatch service is currently unavailable. Please reach us directly at info@nairat.net or call +974 4429 0400.',
          },
          { status: 503 }
        );
      }

      console.log('════════════════════════════════════════════════════════════');
      console.log('📬 [DEV MODE] Contact Form Enquiry Received:');
      console.log(`• Name:      ${cleanName}`);
      console.log(`• Email:     ${cleanEmail}`);
      console.log(`• Phone:     ${cleanPhone || 'Not provided'}`);
      console.log(`• Message:   ${cleanMessage}`);
      console.log(`• Target:    ${recipientEmail}`);
      console.log('ℹ️  Add EMAIL_PASS in .env.local to activate live SMTP dispatch.');
      console.log('════════════════════════════════════════════════════════════');

      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been received (Development Mode).',
          devMode: true,
        },
        { status: 200 }
      );
    }

    // 4. Live SMTP Dispatch
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `Nairat Food Services <${emailUser}>`,
      to: recipientEmail,
      replyTo: cleanEmail,
      subject: `New Website Enquiry: ${cleanName}`,
      text: `
New Website Commercial Enquiry

Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone || 'Not provided'}

Message:
${cleanMessage}

Sent from https://nairatfoodservices.com/contact
      `.trim(),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #f3f4f6;">
            <h2 style="color: #168849; margin: 0; font-size: 22px;">New Website Commercial Enquiry</h2>
            <p style="color: #6b7280; font-size: 13px; margin: 4px 0 0 0;">Nairat Food Services Contact Form</p>
          </div>
          
          <div style="padding: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #111814; font-size: 15px; font-weight: 600;">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #168849; font-size: 15px;"><a href="mailto:${cleanEmail}" style="color: #168849; text-decoration: underline;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #111814; font-size: 15px;">${cleanPhone || 'Not provided'}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #168849;">
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Message Content:</p>
              <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</p>
            </div>
          </div>

          <div style="padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">You can reply directly to this email to respond to <strong>${cleanName}</strong>.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ [SMTP] Email successfully delivered to ${recipientEmail}`);

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Failed to process contact enquiry:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to send message right now. Please try again or contact us via WhatsApp.',
      },
      { status: 500 }
    );
  }
}
