const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const Teacher = require("./../models/teacherSchema");
const Student = require("./../models/studentSchema");
const Class = require("./../models/sclassSchema");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMailT = async (link, teacher) => {
  console.log("abcd");
  let teach = await Teacher.findById(teacher);
  let subject = teach.teachSubject;
  let cl = teach.teachSclass;
  let students = await Student.find({ sclassName: cl });
  let receivers = students.map((student) => student.semail);
  let name = teacher.name;
  console.log("abc");
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: receivers,
    subject: `CLASSCONNECT ZOOM MEET BY ${teacher}`,
    text: `A meet has been scheduled for ${link}`,
  };

  console.log("Ashh");

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent Successfully");
    }
  });
};
const sendMailA = async (link, teacher) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.TO_EMAIL,
    subject: "ZOOM MEETING CLASSCONNECT",
    text: `A meet has been scheduled for ${link}`,
  };

  console.log(link);
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent Successfully");
    }
  });
};

module.exports = { sendMailT, sendMailA };
