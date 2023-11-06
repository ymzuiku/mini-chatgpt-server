import { app } from "../app";
import { loginService } from "./login-service";

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  try {
    const data = await loginService({ email, code });
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
