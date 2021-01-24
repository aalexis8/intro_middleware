const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("HOME PAGE!!");
});

app.get("/cats", (req, res) => {
  res.send("MEOW!!");
});
app.listen(3000, () => {
  console.log("We are running on localhost:3000");
});
