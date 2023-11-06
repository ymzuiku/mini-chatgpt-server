import { sendEmail } from "../middlewares/emailx";
import { getEnv } from "../middlewares/get-env";
import { rds } from "../middlewares/redisx";
import { generateCode } from "../utils/generate-code";
import { IS_DEV } from "../utils/is-dev";
import { isEmail } from "../utils/is-email";
import { SEND_CODE } from "../utils/prefix";

export const errEmailIsFaild = new Error("Email is faild");
export const errCodeIsSent = new Error("Code is sent! Don't send again!");

export async function sendCodeService(email) {
  if (!isEmail(email)) {
    throw errEmailIsFaild;
  }
  const oldCode = await rds.get(SEND_CODE + email);
  if (oldCode) {
    throw errCodeIsSent;
  }
  const code = generateCode(6, IS_DEV);
  await rds.setEx(SEND_CODE + email, 60, code);
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
