import { generateCode } from "./generate-code.js";

export function generateEmail() {
  return `a${generateCode(15)}@qq.com`;
}
