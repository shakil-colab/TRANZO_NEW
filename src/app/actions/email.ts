'use server';

export async function sendEmailReceipt(email: string, transactionId: string, amount: number) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return { success: false, message: 'Resend API key is missing' };
  }

  const payload = {
    from: 'Tranzo <onboarding@resend.dev>',
    to: [email],
    subject: `Tranzo Receipt - ${transactionId}`,
    html: `<h2>Transaction Successful</h2><p>Your transaction of <strong>৳${amount}</strong> has been processed successfully.</p><p>Transaction ID: ${transactionId}</p><p>Thank you for using Tranzo!</p>`
  };

  try {
    // We use the raw REST API endpoint for Resend so it perfectly matches your assignment requirements
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to send email' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: 'Network error occurred' };
  }
}
