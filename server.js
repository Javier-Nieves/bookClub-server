const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const Book = require("./models/bookModel");

const basicRouter = require("./routes/routes");
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use("/", basicRouter);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// List of allowed origins
const allowedOrigins = [
  "https://wave-bookclub-react.vercel.app/",
  "http://localhost:5173/",
];

// Configure CORS middleware with allowed origins
app.use(
  cors({
    origin: allowedOrigins,
  })
);

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

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥💥💥 Shutting down...");
  console.log("🦠", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Dev - Test
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
