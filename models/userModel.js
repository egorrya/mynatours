const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
    },
    email: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.']
    },
    photo: type: String,
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlenght: 8
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm a password"]
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;