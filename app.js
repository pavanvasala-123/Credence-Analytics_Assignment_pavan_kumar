const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./Routes/routes");
const connection = require("./DataBaseConnection/connection");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/Books", router);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listening to the port " + process.env.PORT);
  connection();
});
