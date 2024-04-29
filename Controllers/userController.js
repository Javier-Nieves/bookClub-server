const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
  console.log("sending cookie", token);
  res.status(statusCode).json({ status: "success", token, data: { user } });
};

exports.getAll = catchAsync(async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({ status: "success", data: { allUsers } });
});

exports.signup = catchAsync(async (req, res, next) => {
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

exports.isLoggedIn = async (req, res, next) => {
  const { token } = req.body;
  console.log("someone is checking..");
  console.log("token check:", token);
  // console.log("cookie check:", req.cookies.jwt);

  // no jwt cookie === not logged in
  // if (!req.cookies.jwt)
  if (!token)
    return res.status(200).json({
      status: "fail",
      message: "isn't logged in",
    });
  try {
    // verify token
    const decoded = await promisify(jwt.verify)(
      // req.cookies.jwt,
      token,
      process.env.JWT_SECRET
    );

    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next();
    // There is a logged in user
    // locals - is a place, to which all templates have access
    res.locals.user = currentUser;

    res.status(200).json({
      status: "success",
      message: "user logged in",
      data: { currentUser },
    });
  } catch (error) {
    console.log("catch error", error);
    res.status(403).json({
      status: "fail",
      message: "isn't logged in",
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) return next(new Error("no name or password"));
  // return next(new AppError("Please provide email and password", 400));

  const user = await User.findOne({ name }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new Error("Incorrect password"));
  // return next(new AppError("Please enter valid email and password", 400));

  // login user
  createSendToken(user, 200, res);
});

// exports.logout = (req, res) => {
//   res.cookie("jwt", "randomText", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };
