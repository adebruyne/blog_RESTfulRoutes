var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost/Blog_RESTfulRoutes");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image:
//     "https://images.unsplash.com/photo-1522223142907-0fbfb9c571c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7a69d28bf8e5030872cb254ba06efbd&auto=format&fit=crop&w=900&q=60",
//   body: "HELLO! THIS IS A BLOG POST!"
// });

//RESTFUL ROUTES

app.get("/", function(req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  res.render("index");
});

app.listen(8887, () => {
  console.log("The blog server has started!");
});
