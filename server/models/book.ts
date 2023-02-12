import mongoose from "mongoose";

import { UserI } from "./user";

export enum Status {
  wishlist = "wishlist",
  reading = "reading",
  read = "read",
}

export interface Book extends mongoose.Document {
  title: string;
  authors: string[];
  status: Status;
  // ===== GOODREADS ID =====
  id: string;
  // ===== GOODREADS ID =====
  user: UserI | string;
  thumbnail: string;
}

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  status: {
    required: true,
    type: String,
    enum: ["wishlist", "reading", "read"],
  },
  // ===== GOODREADS ID =====
  id: { required: true, type: String },
  // ===== GOODREADS ID =====
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  thumbnail: String,
});

export default mongoose.model<Book>("Book", schema);
