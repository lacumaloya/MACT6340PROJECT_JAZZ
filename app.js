import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from './utils/database.js';
let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// app.get("/", async (req, res) => {
//   await db
//     .connect()
//     .then(async () => {
//       projects = await db.getAllProjects();
//       console.log(projects);
//       res.render("index.ejs");
//     })
//     .catch(next);
// });

app.get("/project", (req, res) => {
  res.render("project.ejs", { data: "Welcome to my personal NFT project!" });
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", { projectArray: projects });
});

app.get("/project/:id", (req, res, next) => {
  try {
    let id = req.params.id;
    if (id > data.length) {
      throw new Error("No project with that ID");
    }
    res.render("projects.ejs", { projectArray: data, which: id });
  } catch (error) {
    next(error);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/mail", async (req, res) => {
  try {
    await utils.sendMessage(req.body.sub, req.body.txt);
    res.send({ result: "success" });
  } catch (error) {
    console.error('Error sending message:', error);
    res.send({ result: "failure" });
  }
});

app.use(async (err, req, res, next) => {
  console.log(err);
  let msg;
  msg = err.message;
  if (msg != "No project with that ID") {
    msg = "Internal error :( Sorry! Let us fix that for you :)";
  }
  res.render("error.ejs", { msg: msg });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});