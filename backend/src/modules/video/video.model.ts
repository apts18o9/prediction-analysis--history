import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  videoUrl: string;
  videoId: string;
  audioPath: string;
  status: "PENDING" | "AUDIO_EXTRACTED" | "FAILED";
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>({
  videoUrl: { type: String, required: true, unique: true },
  videoId: { type: String, required: true },
  audioPath: { type: String },
  status: {
    type: String,
    enum: ["PENDING", "AUDIO_EXTRACTED", "FAILED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVideo>("Video", VideoSchema);
