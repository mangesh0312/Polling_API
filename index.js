const express = require("express");
const port = process.env.port || 8000;
const db = require("./config/mongoose");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is up and runing on port: ${port}`);
});
