const express = require("express");
const app = express();

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

console.log("Worker proccess started");
app.listen(5000);
