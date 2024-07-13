import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { RootRoutes } from "./routes/root.routes";
import fs from "fs";
import path from "path";
import handleZodValidationError from "./errors/validationError";
import { Session } from "./config/mongoStore";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://adcti-class-tracker.vercel.app"],
    credentials: true,
  })
);

app.use(helmet());
// set session middleware
Session.connectSessionDatabase(app);
app.use(morgan("dev"));

// application routes
app.use("/api/v1", RootRoutes);

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../public", "index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.send(data);
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ZodError") {
    const errors = handleZodValidationError(err);
    res.status(err.status || 500).json({
      message: "Validation error. Invalid data provided",
      errors,
    });
  } else {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  }
});

export default app;
