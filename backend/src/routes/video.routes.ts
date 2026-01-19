import { Router } from "express";
import Creator from "../models/Creator";
import Video, { IVideo } from "../models/Video";
import { fetchChannelVideos } from "../services/youtube.service";

const router = Router();


router.post("/fetch/:creatorId", async (req, res) => {
  const creator = await Creator.findById(req.params.creatorId);
  if (!creator) {
    return res.status(404).json({ message: "Creator not found" });
  }

  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  const videos = await fetchChannelVideos(
    creator.youtubeChannelId,
    threeYearsAgo.toISOString()
  );

  const savedVideos: IVideo[] = [];

  for (const item of videos) {
    if (!item.id?.videoId) continue;

    const exists = await Video.findOne({ videoId: item.id.videoId });
    if (exists) continue;

    // Skip if required fields are missing
    if (!item.snippet?.title || !item.snippet?.publishedAt) continue;

    const video = await Video.create({
      creator: creator._id,
      videoId: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt
    });

    savedVideos.push(video);
  }

  res.json({
    fetched: savedVideos.length,
    videos: savedVideos
  });
});

export default router;
