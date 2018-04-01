const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const bus = require("./api");

app.use(express.static(path.join(__dirname, "dist")));
//跨域解决方案
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"]
  })
);

app.get("*", (req, res) => {
  const params = req.params;
  const query = req.query;
  const queryPath = req.path;
  if (req.path === "/bus/") {
    bus({
      name: query.name,
      from: query.from,
      key: query.type
    }).then(resp => {
      res.send(resp);
    });
  }
});

app.listen(8000, "localhost", function(err) {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
  console.log(`>Server is running on http://localhost:8000/`);
});
