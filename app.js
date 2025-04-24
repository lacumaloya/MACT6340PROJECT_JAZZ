import express from "express";
import * as utils from "./utils/utils.js";
import * as db from './utils/database.js';
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";


// Sample project data
const projects = [
  {
    name: "Self-Portrait NFT",
    description: "A self-portrait piece created using Processing",
    image: "https://nft-mint-cdn-jazz.nyc3.cdn.digitaloceanspaces.com/images/Self-Portrait_Jasmine.png",
    editions: "1 of 1",
    price: "0.01 ETH"
  },
  {
    name: "Rodrigue",
    description: "A digital inspiration of a most beloved companion",
    image: "https://nft-mint-cdn-jazz.nyc3.cdn.digitaloceanspaces.com/images/Rodrigue_Jasmine.png",
    editions: "1 of 1",
    price: "0.02 ETH"
  },
  {
    name: "Geo Bouquet",
    description: "A 3D bouquet of geometric shapes",
    image: "https://nft-mint-cdn-jazz.nyc3.cdn.digitaloceanspaces.com/images/geo_bouquet.png",
    editions: "1 of 1",
    price: "0.03 ETH"
  }
];

const app = express();
app.use(cors());
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/", async (req, res) => {
  await db
    .connect()
    .then(async () => {
      projects = await db.getAllProjects();
      console.log(projects);
      res.render("index.ejs");
    })
    .catch(next);
});

app.get("/project", (req, res) => {
  res.render("project.ejs", { project: projects[0] });
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", { projectArray: projects });
});

app.get("/project/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (id >= projects.length) {
      throw new Error("No project with that ID");
    }
    res.render("project.ejs", { project: projects[id] });
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