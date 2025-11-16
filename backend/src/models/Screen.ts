import mongoose, { Schema, Document } from "mongoose";

export interface IScreen extends Document {
  name: string;
  isActive: boolean;
}

const ScreenSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<IScreen>("Screen", ScreenSchema);
