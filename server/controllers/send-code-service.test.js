import { expect, test } from "vitest";
import { generateEmail } from "../utils/generate-email.js";
import {
  errCodeIsSent,
  errEmailIsFaild,
  sendCodeService,
} from "./send-code-service.js";

test("email faild", async () => {
  const [res] = await Promise.allSettled([sendCodeService("ym@xxx")]);
  expect(res.status).toBe("rejected");
  expect(res.reason).toBe(errEmailIsFaild);
});

test("email success", async () => {
  const email = generateEmail();
  const [res] = await Promise.allSettled([sendCodeService(email)]);
  expect(res.status).toBe("fulfilled");
  expect(res.reason).toBe(void 0);
});

test("email double", async () => {
  const email = generateEmail();
  {
    const [res] = await Promise.allSettled([sendCodeService(email)]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
  }
  {
    const [res] = await Promise.allSettled([sendCodeService(email)]);
    expect(res.status).toBe("rejected");
    expect(res.reason).toBe(errCodeIsSent);
  }
});
