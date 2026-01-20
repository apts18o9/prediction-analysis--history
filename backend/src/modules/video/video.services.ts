import path from "path";
import { v4 as uuidv4 } from "uuid";
import Video from "./video.model";
import runCommand from "../../utils/runCommand"

const AUDIO_DIR = path.join(process.cwd(), "storage/audio");

export async function ingestVideo(videoUrl: string) {
  // 1. Check if already processed
  const existing = await Video.findOne({ videoUrl });
  if (existing) return existing;

  // 2. Create DB entry
  const videoId = uuidv4();
  const audioPath = path.join(AUDIO_DIR, `${videoId}.wav`);

  const video = await Video.create({
    videoUrl,
    videoId,
    status: "PENDING",
  });

  try {
    // 3. Download + convert audio
    const command = `
      yt-dlp -f bestaudio \
      --extract-audio \
      --audio-format wav \
      --audio-quality 0 \
      -o "${audioPath}" \
      ${videoUrl}
    `;

    await runCommand(command);

    // 4. Update DB
    video.audioPath = audioPath;
    video.status = "AUDIO_EXTRACTED";
    await video.save();

    return video;
  } catch (err) {
    video.status = "FAILED";
    await video.save();
    throw err;
  }
}


export default ingestVideo