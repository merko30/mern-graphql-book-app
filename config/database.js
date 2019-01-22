const mongoose = require('mongoose');

module.exports = connect = (mongoUrl) => mongoose
    .connect(
        mongoUrl,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to mLab database");
    })
    .catch(error => console.log("Database connection error: ", error));