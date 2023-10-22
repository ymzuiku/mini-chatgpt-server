import { sendEmail } from "../middlewares/emailx.js";
import { getEnv } from "../middlewares/get-env.js";
import { rds } from "../middlewares/redisx.js";
import { generateCode } from "../utils/generate-code.js";
import { isEmail } from "../utils/is-email.js";

export const errEmailIsFaild = new Error("Email is faild");
export const errCodeIsSent = new Error("Code is sent! Don't send again!");

export async function loginService(email) {
  if (!isEmail(email)) {
    throw errEmailIsFaild;
  }
  const oldCode = await rds.get(email);
  if (oldCode) {
    throw errCodeIsSent;
  }
  const code = generateCode(6);
  await rds.setEx(email, 60, code);
  try {
    await sendEmail({
      from: `Register mini-chatgpt <${getEnv("EMAIL_USER")}>`,
      to: email,
      subject: "Register mini-chatgpt",
      text: "Your code: " + code,
    });
  } catch (err) {
    throw err;
  }

  return { ok: 1 };
}
