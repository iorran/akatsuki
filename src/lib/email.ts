import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const sendEmail = async (userId: any, message: any) => {
  const msg = {
    to: userId?.email,
    from: "iorranpt@gmail.com",
    subject: "Scheduled Message",
    text: message,
  };

  await sgMail.send(msg);
};