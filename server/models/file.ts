import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
interface IFile extends Document {
  filename: string;
  path: string;
  size: string;
  sender: string;
  receiver: string;
}
export default mongoose.model<IFile>("File", fileSchema);
