import { kill } from "cross-port-killer";
import { spawn } from "node:child_process";
import fs from "node:fs";

async function runWorker() {
  await kill(3001);
  spawn("node", ["server/index.js"], { stdio: "inherit" });
}

runWorker();

fs.watch("./server", (event, file) => {
  runWorker();
});
