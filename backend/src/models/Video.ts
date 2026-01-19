//video schema 


import { Schema, model, Document, Types } from "mongoose";

export interface IVideo extends Document {
  creator: Types.ObjectId;
  videoId: string; //yt video id
  title: string; //video title (use by llm for context)
  publishedAt: Date;
}

const VideoSchema = new Schema<IVideo>({
  creator: { type: Schema.Types.ObjectId, ref: "Creator", required: true },
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  publishedAt: { type: Date, required: true }
});

export default model<IVideo>("Video", VideoSchema);
