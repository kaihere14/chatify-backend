import express, { Router, text } from "express";
import main from "./src/controllers/ai.js";
import cors from "cors";
import { dbConnect } from "./src/db/index.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: "https://chatify-ai.vercel.app/",
    credentials: true,
  })
);
app.use(cookieParser());
import gemini from "./src/routes/gemini.routes.js";
import user from "./src/routes/user.routes.js";
import me from "./src/routes/me.routes.js";

app.use("/", gemini);
app.use("/", user);
app.use("/", me);

const startServer = async () => {
  try {
    await dbConnect(); // wait for DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // terminate process if DB fails
  }
};

startServer();
