// sendEmail.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL, // must be the verified sender email
    subject,
    text,
    html: `<p>${text}</p>`, // optional but improves deliverability
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent via SendGrid:", response[0].statusCode);
  } catch (error) {
    console.error(
      "Error sending email via SendGrid:",
      error.response?.body || error.message
    );
    throw error;
  }
};

export default sendEmail;

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async (to, subject, text) => {
//   try {
//     const data = await resend.emails.send({
//       from: "Your App <onboarding@resend.dev>", // default sender for testing
//       to,
//       subject,
//       text,
//     });
//     console.log("Email sent via Resend response:", data);
//     console.log("Resend API key present:", !!process.env.RESEND_API_KEY);

//     console.log("Email sent via Resend:", data.id);
//   } catch (error) {
//     console.error("Error sending email via Resend:", error);
//     throw error;
//   }
// };

// export default sendEmail;

// import nodemailer from "nodemailer";

// // const sendEmail = async (to, subject, text) => {
// //   const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.MY_EMAIL,
// //       pass: process.env.MY_PASS,
// //     },
// //   });

// //   const mailOptions = {
// //     from: process.env.MY_EMAIL,
// //     to,
// //     subject,
// //     text,
// //   };

// //   await transporter.sendMail(mailOptions);
// // };

// const sendEmail = async (to, subject, text) => {
//   try {
//     console.log("Preparing to send email...");

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MY_EMAIL,
//         pass: process.env.MY_PASS,
//       },
//     });

//     console.log("Transporter created.");

//     const mailOptions = {
//       from: process.env.MY_EMAIL,
//       to,
//       subject,
//       text,
//     };

//     console.log("Mail options set. Sending email...");

//     const info = await transporter.sendMail(mailOptions);

//     console.log("Email sent:", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// export default sendEmail;
