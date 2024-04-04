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
  delay(4000);
  res.send(`Beep beep ${process.pid}`);
});

console.log("Running server.js");

console.log("Worker proccess started");
app.listen(5000);
