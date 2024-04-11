const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../catchAsync");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({ status: "success", token, data: { user } });
};

exports.getAll = catchAsync(async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({ status: "success", data: { allUsers } });
});

exports.signup = catchAsync(async (req, res, next) => {
  console.log("body: ", req.body);
  try {
    const newUser = await User.create({
      name: req.body.name.toLowerCase(),
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    // login new user
    createSendToken(newUser, 201, res);
  } catch (err) {
    // throw new AppError(err.message, 400);
    console.log(err);
  }
});

// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return next(new AppError("Please provide email and password", 400));

//   const user = await User.findOne({ email }).select("+password");
//   if (!user || !(await user.correctPassword(password, user.password)))
//     return next(new AppError("Please enter valid email and password", 400));

//   // login user
//   createSendToken(user, 200, res);
// });

// exports.logout = (req, res) => {
//   res.cookie("jwt", "randomText", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };
