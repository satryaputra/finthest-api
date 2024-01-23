import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: process.env.NODE_ENV === "development" ? false : true,
  auth: {
    user: "lkurniahadi@gmail.com",
    pass: "pdsrmlkrumvdhori",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
