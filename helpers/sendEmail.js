import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Щоб підтвердити email, натисни <a href="${verifyLink}">сюди</a></p>`,
  });
};
