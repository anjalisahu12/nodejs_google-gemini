const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
require("dotenv").config();

app.get("/api/content", async (req, res) => {
  try {
    const data = req.body.question;
    const result = await generate(data);
    res.send({
      result: result,
    });
  } catch (err) {
    res.send("error:" + err);
  }
});
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "Write a story about a magic backpack.";
const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (err) {
    console.log(err);
  }
};
// generate();
app.listen(3000, () => {
  console.log("server is listining on port 3000");
});
