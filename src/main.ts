import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
