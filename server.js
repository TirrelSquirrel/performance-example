const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

cluster.schedulingPolicy = cluster.SCHED_RR;

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked
  }
}

app.get("/", (req, res) => {
  res.send(`Perfomance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  //delay the response
  delay(9000);
  res.send(`Ding dong ${process.pid}`);
});

console.log("Running server.js");
if (cluster.isMaster) {
  console.log("Master has been started..");
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
    console.log(`${i+1} total of forked`)
  }
} else {
  console.log("Worker proccess started");
  app.listen(5000);
}
