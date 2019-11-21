const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = require("mongoose").Schema;
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password);
  next();
});

UserSchema.methods.createToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
