import { generateCode } from "./generate-code";

export function generateEmail() {
  return `a${generateCode(15)}@qq.com`;
}
