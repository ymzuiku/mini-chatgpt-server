import { expect, test } from "vitest";
import { generateEmail } from "../utils/generate-email.js";
import {
  errCodeIsSent,
  errEmailIsFaild,
  loginService,
} from "./login-service.js";

test("email faild", async () => {
  const [res] = await Promise.allSettled([loginService("ym@xxx")]);
  expect(res.status).toBe("rejected");
  expect(res.reason).toBe(errEmailIsFaild);
});

test("email success", async () => {
  const email = generateEmail();
  const [res] = await Promise.allSettled([loginService(email)]);
  expect(res.status).toBe("fulfilled");
  expect(res.reason).toBe(void 0);
});

test("email double", async () => {
  const email = generateEmail();
  {
    const [res] = await Promise.allSettled([loginService(email)]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
  }
  {
    const [res] = await Promise.allSettled([loginService(email)]);
    expect(res.status).toBe("rejected");
    expect(res.reason).toBe(errCodeIsSent);
  }
});
