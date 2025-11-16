import mongoose, { Schema, Document } from "mongoose";

export interface IPlaylist extends Document {
  name: string;
  itemUrls: string[];
}

const PlaylistSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  itemUrls: {
    type: [String],
    validate: [(val: string[]) => val.length <= 10, "Max 10 URLs allowed"],
    default: [],
  },
});

export default mongoose.model<IPlaylist>("Playlist", PlaylistSchema);
