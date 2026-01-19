//creator schema 

import { Schema, model, Document } from "mongoose";

export interface ICreator extends Document {
  name: string;
  slug: string;
  youtubeChannelId: string;
  createdAt: Date;
}

const CreatorSchema = new Schema<ICreator>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  youtubeChannelId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<ICreator>("Creator", CreatorSchema);
