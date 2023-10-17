import { app } from "../app.js";
import { rds } from "../middlewares/redisx.js";
import { generateCode } from "../utils/generate-code.js";
import { isEmail } from "../utils/is-email.js";

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  if (!isEmail(email)) {
    res.status(400).send({ error: "Email is faild" });
    return;
  }
  const oldCode = await rds.get(email);
  if (oldCode) {
    res.status(400).send({ error: "Code is sent! Don't send again!" });
    return;
  }
  rds.setEx(email, 60, generateCode());
  res.send({
    ok: true,
    email,
  });
});
