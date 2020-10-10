import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.DB!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};
