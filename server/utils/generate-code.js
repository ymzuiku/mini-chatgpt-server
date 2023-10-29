export function generateCode(len, isDev) {
  if (isDev) {
    return "999999";
  }

  if (len <= 0) {
    return ""; // 如果长度小于等于0，返回空字符串
  }

  // 生成随机字符串，确保开头不是0
  let code = "";
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      // 第一个字符不能是0，随机生成1到9的数字
      code += Math.floor(Math.random() * 9) + 1;
    } else {
      // 生成0到9的随机数字
      code += Math.floor(Math.random() * 10);
    }
  }

  return code;
}
