//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.get("/", function(req,res){
  res.send("Hello");
});

app.post("/", function(req, res) {
  res.send(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
