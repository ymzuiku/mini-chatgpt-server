import { app } from "../app.js";
import { loginService } from "./login-service.js";

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  try {
    const data = await loginService(email);
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
