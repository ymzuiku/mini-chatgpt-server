export function isEmail(email) {
  // 使用正则表达式来检查电子邮件格式
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email || !email.match(emailRegex)) {
    return false;
  }

  // 进一步的检查：确保@符号前后都有字符
  const atIndex = email.indexOf("@");
  if (atIndex <= 0 || atIndex === email.length - 1) {
    return false;
  }

  // 通过所有检查，认为是有效的电子邮件地址
  return true;
}
