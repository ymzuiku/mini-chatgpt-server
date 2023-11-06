import { app } from "../app";
import { sendCodeService } from "./send-code-service";

app.post("/api/send-code", async (req, res) => {
  const email = req.body.email;
  try {
    const data = await sendCodeService(email);
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
