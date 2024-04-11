const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const validator = require('validator');
// const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    minlength: [2, "Username should be at least 2 characters long"],
    maxlength: [20, "Username is too long!"],
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  //   validate: validator.isEmail,
  // },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be at least 8 characters long"],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password and validation do not match.",
    },
  },
  // passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // active: {
  //   type: Boolean,
  //   default: true,
  // },
});

// userSchema.set('toJSON', {
//   transform: function (doc, ret) {
//     // Define what fields to include when the document is transformed to JSON
//     return {
//       name: ret.name,
//       photo: ret.photo,
//       id: ret._id,
//     };
//   },
// });

userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
