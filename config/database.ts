import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.DB!);
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};
