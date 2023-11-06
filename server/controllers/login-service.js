import { v4 } from "uuid";
import { prismax } from "../middlewares/prismax";
import { rds } from "../middlewares/redisx";
import { ONE_WEEK } from "../utils/dates";
import { isEmail } from "../utils/is-email";
import { SEND_CODE, TOKEN } from "../utils/prefix";

export const errCodeValid = new Error("your code or email is invalid");
export const errFaildEmailFormat = new Error("your email is faild");
export const errFaildCodeFormat = new Error("your code is faild");

export async function loginService({ email, code } = {}) {
  if (!email || !isEmail(email)) {
    throw errFaildEmailFormat;
  }
  if (!code || code.length !== 6) {
    throw errFaildCodeFormat;
  }

  const oldCode = await rds.get(SEND_CODE + email);
  if (code !== oldCode) {
    throw errCodeValid;
  }

  const oldUser = await prismax.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!oldUser) {
    // if email no register
    try {
      const res = await prismax.user.create({
        data: {
          email: email,
          name: "",
        },
      });
      await rds.del(SEND_CODE + email);
      const token = v4();
      await rds.setEx(TOKEN + token, ONE_WEEK, email);
      return { ok: 1, token, email };
    } catch (err) {
      throw err;
    }
  }

  await rds.del(SEND_CODE + email);
  // is email is registed
  const token = v4();
  await rds.setEx(token, ONE_WEEK, email);
  return { ok: 1, token, email };
}
