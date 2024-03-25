const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const basicRouter = require("./routes/routes");
const bookRouter = require("./routes/bookRoutes");

const app = express();

app.use(express.static("public"));
app.use("/", basicRouter);
// ROUTES:
app.use("/api/v1/books", bookRouter);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

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
