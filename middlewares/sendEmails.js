import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, subject, text) {
  const msg = {
    to,
    from: "lorusso.lorenzo98@gmail.com",
    subject,
    text,
  };

  await sgMail.send(msg);
}