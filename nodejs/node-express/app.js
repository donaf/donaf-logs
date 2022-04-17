const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/one", (req, res) => {
  request
    .get("/search")
    .set("API-Key", "foobar")
    .set("Accept", "application/json")
    .then(callback);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
