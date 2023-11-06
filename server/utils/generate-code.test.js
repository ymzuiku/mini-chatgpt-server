import { expect, test } from "vitest";
import { generateCode } from "./generate-code";

test("generate-code", () => {
  expect(generateCode()).toBe("");
  expect(generateCode(0, true)).toBe("999999");
  expect(generateCode(1).length).toBe(1);
  expect(generateCode(5).length).toBe(5);
  expect(generateCode(10).length).toBe(10);
  expect(generateCode(0).length).toBe(0);
  expect(generateCode(6).length).not.toBe("999999");
});
