const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log("User defined middlethingy!!!");
  next(); // we passed in next and we call it.
});

app.use((req, res, next) => {
  console.log("This one runs next followed by!!!");
  next(); // we passed in next and we call it.
  console.log("Another console.log which runs after next is called");
});

app.use((req, res, next) => {
  console.log("This one runs next followed by!!!");
  return next(); // we passed in next and we call it.
  console.log(
    "Nothing, doesn't run, because of key word return, which ends the function"
  );
});

app.get("/", (req, res) => {
  res.send("HOME PAGE!!");
});

app.get("/cats", (req, res) => {
  res.send("MEOW!!");
});
app.listen(3000, () => {
  console.log("We are running on localhost:3000");
});
