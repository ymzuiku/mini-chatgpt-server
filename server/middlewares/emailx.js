import nodemailer from "nodemailer";
import { getEnv } from "./get-env";

export function sendEmail({ from, to, subject, text }) {
  if (getEnv("DEV") === "1") {
    return;
  }
  // 创建邮件传输对象
  const transporter = nodemailer.createTransport({
    host: getEnv("EMAIL_HOST"),
    port: Number(getEnv("EMAIL_PORT")),
    auth: {
      user: getEnv("EMAIL_USER"),
      pass: getEnv("EMAIL_PASS"),
    },
  });

  return new Promise((res, rej) => {
    // 发送邮件
    transporter.sendMail({ from, to, subject, text }, (error, info) => {
      if (error) {
        rej(error);
      } else {
        res();
      }
    });
  });
}
