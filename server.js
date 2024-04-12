const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");

const Book = require("./models/bookModel");

const basicRouter = require("./routes/routes");
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.static("public"));
app.use("/", basicRouter);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ROUTES:
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
  // insertData();
  // console.log("Data inserted!");
});

const server = app.listen(3000, () => {
  console.log(`App running on port 3000...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

async function insertData() {
  try {
    // Data to insert
    const booksToInsert = [];

    // Insert data into the 'books' collection
    const result = await Book.insertMany(booksToInsert);
    console.log(`${result.length} documents inserted`);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
