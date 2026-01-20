import { Request, Response } from "express";
import {ingestVideo} from "../video/video.services"

export async function ingestVideoHandler(req: Request, res: Response) {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: "videoUrl is required" });
  }

  try {
    const video = await ingestVideo(videoUrl);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to ingest video" });
  }
}
