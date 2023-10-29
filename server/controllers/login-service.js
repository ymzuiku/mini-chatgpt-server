import { rds } from "../middlewares/redisx";
import { isEmail } from "../utils/is-email";

export const errCodeValid = new Error("your code or email is valid");
export const errFaildEmailFormat = new Error("your email is faild");
export const errFaildCodeFormat = new Error("your code is faild");

export async function loginService({ email, code } = {}) {
  if (!email || !isEmail(email)) {
    throw errFaildEmailFormat;
  }
  if (!code || code.length !== 6) {
    throw errFaildCodeFormat;
  }

  const oldCode = await rds.get(email);
  if (code !== oldCode) {
    throw errCodeValid;
  }

  // if email no register

  // is email is registed

  return { ok: 1, token: "", email };
}
