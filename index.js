const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path"); // folder use inside index,js we decalre this
const { v4: uuidv4 } = require("uuid"); // unique id given pacakage
const methodOverride = require("method-override");
const { log } = require("console");

app.use(express.urlencoded({ extended: true })); //api request or frontend req accept
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); //ejs engine set
app.set("views", path.join(__dirname, "views")); //view folder hold html data tp acces code
app.use(express.static(path.join(__dirname, "public"))); //public folder have cdss and js data so we add thid extra thingds

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "shradakapra",
    content: "hard work is imporntant to achive success",
  },
  {
    id: uuidv4(),
    username: "rahul",
    content: "i got selected for my first internship",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//for new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts"); //redirect the page post
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`app listening ${PORT}`);
});

//practise





