import nodemailer from "nodemailer";

// const sendEmail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MY_EMAIL,
//       pass: process.env.MY_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.MY_EMAIL,
//     to,
//     subject,
//     text,
//   };

//   await transporter.sendMail(mailOptions);
// };

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Preparing to send email...");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS,
      },
    });

    console.log("Transporter created.");

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to,
      subject,
      text,
    };

    console.log("Mail options set. Sending email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
