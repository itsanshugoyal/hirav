import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import userRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error:", err);
  });
const app = express();
app.use(express.json());

app.use(express.json());

app.use("/server/user", userRouter);
app.use("/server/auth", authRoutes);
app.post("/api/chatgpt", async (req, res) => {
  const userData = req.body;
  console.log("hey", userData);

  try {
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/engines/gpt-4o-mini/completions",
      {
        prompt: `Create an investment plan for the following data: ${JSON.stringify(userData)}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer API_KEY`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(gptResponse.data.choices[0].text);
  } catch (error) {
    console.error("Error fetching data from ChatGPT", error);
    res.status(500).send("Error fetching data from ChatGPT");
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ sucess: false, statusCode, message });
});

app.listen(3000, () => {
  console.log("server running on 3000");
});
