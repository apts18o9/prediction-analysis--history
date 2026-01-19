import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY
});

export const fetchChannelVideos = async (
  channelId: string,
  publishedAfter: string
) => {
  const response = await youtube.search.list({
    part: ["snippet"],
    channelId,
    maxResults: 25,
    order: "date",
    publishedAfter,
    type: ["video"]
  });

  return response.data.items || [];
};
