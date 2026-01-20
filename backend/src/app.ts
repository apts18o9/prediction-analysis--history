
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import videoRoutes from "./modules/video/video.routes";


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev")); //for easy debugging 


app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});


app.use("/api/videos", videoRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(" Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

export default app;
