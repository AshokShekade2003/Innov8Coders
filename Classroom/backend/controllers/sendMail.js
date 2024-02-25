const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ashokshekade011@gmail.com",
        pass: "9767473068",
      },
    });

    let info = await transporter.sendMail({
      from: "ashokshekade011@gmail.com", // sender address
      to: "ashokshekade543@gmail.com", // list of receivers
      subject: "Hello Thapa", // Subject line
      text: "Hello YT Thapa", // plain text body
      html: "<b>Hello YT Thapa</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({ error: "An error occurred while sending email" });
  }
};

module.exports = sendMail;
