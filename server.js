import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("DSA Instructor Backend Running 🚀");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.get("/hello", (req, res) => {
  res.send("Hello from DSA Instructor!");
});