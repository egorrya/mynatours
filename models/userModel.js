const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
  },
  email: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlenght: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm a password"],
    validate: {
      // this is only works with create and save
      validator: function(el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
});

// this middleware works between getting the data and putting it into the db
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();

  // password ecnryption
  this.password = bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
