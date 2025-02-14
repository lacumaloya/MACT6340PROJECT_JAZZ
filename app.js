import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("public"));



app.post("/mail", (req, res) => {
    res.send("mail button clicked");
});

app.listen(port, () => {
    console.log(process.env.SENSITIVE_INFO)
    console.log(`Example app listening on port ${port}`);
});