import { app } from "../app";

app.get("/api/ping", (req, res) => {
  res.send("pong");
});
