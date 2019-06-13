//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

var app = express();
var items=[];
app.use(bodyParser.urlencoded({extended: true}));
//tell the app to use ejs
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  var today = new Date();
  // var currentDay = today.getDay();
  // var day = "";
  //
  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  //   //rendering a file called list, has to be inside views folder
  //   //send there the value of day. Name of the variable needs to match whatever
  //   //inside list.ejs
  // } else {
  //   day = "Weekday";
  // }

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});


app.post("/", function(req, res) {
  var item = req.body.newItem;
  //when we click submit button, we save the input inside item, after that
  //redirect to the home route (back to app.get), then res.render will have
  //the value of item and send it to list.ejs
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
