const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

// this is positional, if we move this down after we need requestime -- well requestime will be undefined.
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

// but i don't have a route for dogs, let see what happens (the function ran, the route 404)
app.use("/dogs", (req, res, next) => {
  console.log("I LOVE CATS!!");
  next();
});

// Can't make it to routes unless you know the password
app.use((req, res, next) => {
  const { password } = req.query;
  if (password === "mypassword") {
    next();
  }
  res.send("PASSWORD NEEDED!!");
  // console.log(req.query);
  // next();
});
// app.use((req, res, next) => {
//   console.log("User defined middlethingy!!!");
//   next(); // we passed in next and we call it.
// });

// app.use((req, res, next) => {
//   console.log("This one runs next followed by!!!");
//   next(); // we passed in next and we call it.
//   console.log("Another console.log which runs after next is called");
// });

// app.use((req, res, next) => {
//   console.log("This one runs next followed by!!!");
//   return next(); // we passed in next and we call it.
//   console.log(
//     "Nothing, doesn't run, because of key word return, which ends the function"
//   );
// });

app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("HOME PAGE!!");
});

app.get("/cats", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("MEOW!!");
});

app.get("/secret", (req, res) => {
  res.send("THE SECRET IS: visualizing a million dollars is not enough lol!!!");
});

// Now when I call /dogs, it falls through to this catch all -- now raising the status to 404
app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
  // res.send("NOT FOUND!");
});
app.listen(3000, () => {
  console.log("We are running on localhost:3000");
});
