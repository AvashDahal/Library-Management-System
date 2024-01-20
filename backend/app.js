import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// import formData from "express-form-data";
//   

import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";

import connectDB from "./db/database.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
const options = {
  uploadDir: path.join(".", "uploads"),
};
// app.use(formData.parse(options));
app.use(cookieParser());
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use(express.static(path.join(__dirname, "frontend/build")));
export { app };

