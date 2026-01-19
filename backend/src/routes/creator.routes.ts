import { Router } from "express";
import Creator from "../models/Creator";

const router = Router();


router.post("/", async (req, res) => {
  const { name, slug, youtubeChannelId } = req.body;

  const creator = await Creator.create({
    name,
    slug,
    youtubeChannelId
  });

  res.status(201).json(creator);
});

router.get("/", async (_, res) => {
  const creators = await Creator.find();
  res.json(creators);
});

export default router;
