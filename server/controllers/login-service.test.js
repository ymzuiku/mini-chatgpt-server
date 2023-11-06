import { expect, test } from "vitest";
import { generateEmail } from "../utils/generate-email";
import {
  errCodeValid,
  errFaildCodeFormat,
  errFaildEmailFormat,
  loginService,
} from "./login-service";
import { sendCodeService } from "./send-code-service";

test("login fail params", async () => {
  {
    const [res] = await Promise.allSettled([loginService({})]);
    // res.status === 'rejected'
    expect(res.status).toBe("rejected");
    expect(res.reason).toBe(errFaildEmailFormat);
  }
  {
    const [res] = await Promise.allSettled([loginService({ email: "dog" })]);
    // res.status === 'rejected'
    expect(res.status).toBe("rejected");
    expect(res.reason).toBe(errFaildEmailFormat);
  }
  {
    const [res] = await Promise.allSettled([
      loginService({ email: "dog@qq.com", code: "code" }),
    ]);
    expect(res.status).toBe("rejected");
    expect(res.reason).toBe(errFaildCodeFormat);
  }
});

test("login code faild", async () => {
  const [res] = await Promise.allSettled([
    loginService({ email: "dog@qq.com", code: "999998" }),
  ]);
  expect(res.status).toBe("rejected");
  expect(res.reason).toBe(errCodeValid);
});

test("login success", async () => {
  const email = generateEmail();
  {
    const [res] = await Promise.allSettled([sendCodeService(email)]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
  }

  const [res] = await Promise.allSettled([
    loginService({ email, code: "999999" }),
  ]);
  expect(res.status).toBe("fulfilled");
  expect(res.reason).toBe(void 0);
  expect(res.value.ok).toBe(1);
  expect(res.value.token.length > 15).toBe(true);
  expect(res.value.email).toBe(email);
});

test("login again success", async () => {
  const email = generateEmail();
  {
    const [res] = await Promise.allSettled([sendCodeService(email)]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
  }

  {
    const [res] = await Promise.allSettled([
      loginService({ email, code: "999999" }),
    ]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
    expect(res.value.ok).toBe(1);
    expect(res.value.token.length > 15).toBe(true);
    expect(res.value.email).toBe(email);
  }

  {
    const [res] = await Promise.allSettled([sendCodeService(email)]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
  }

  {
    const [res] = await Promise.allSettled([
      loginService({ email, code: "999999" }),
    ]);
    expect(res.status).toBe("fulfilled");
    expect(res.reason).toBe(void 0);
    expect(res.value.ok).toBe(1);
    expect(res.value.token.length > 15).toBe(true);
    expect(res.value.email).toBe(email);
  }
});
