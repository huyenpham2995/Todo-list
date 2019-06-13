//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let items = ["Buy Food", "Cook Food"];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//tell the app to use ejs
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  let today = new Date();
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

  //get the day from date.js, our customized module
  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  //when we click submit button, we save the input inside item, after that
  //redirect to the home route (back to app.get), then res.render will have
  //the value of item and send it to list.ejs
  if (req.body.list === "Work") { //list is from the name of the button
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
