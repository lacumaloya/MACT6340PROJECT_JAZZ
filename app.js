import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));

app.post("/mail", (req, res) => {
    res.send("mail button clicked");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});