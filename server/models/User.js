const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = require('mongoose').Schema;

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});




module.exports = mongoose.model("User", UserSchema);

