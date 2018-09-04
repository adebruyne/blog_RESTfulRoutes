var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  app = express();
//APP CONFIG
mongoose.connect("mongodb://localhost/Blog_RESTfulRoutes");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

//INDEX
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//NEW
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//CREATE
app.post("/blogs", function(req, res) {
  //create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      //then, redirect to the Index
      res.redirect("/blogs");
    }
  });
});

//SHOW
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

//EDIT
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

//UPDATE
// app.put("blogs/:id", function(req, res) {
//   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
//     err,
//     updatedBlog
//   ) {
//     if (err) {
//       res.redirect("/blogs");
//     } else {
//       res.redirect("/blogs/" + req.params.id);
//     }
//   });
// });

//DELETE
app.delete("/blogs/:id", function(req,res){
  //destroy blog
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
       res.redirect("/blogs");
    } else{
      res.redirect("/blogs");
    }
  })

})


app.listen(8887, () => {
  console.log("The blog server has started!");
});
