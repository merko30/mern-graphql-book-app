const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};
