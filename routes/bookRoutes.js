const express = require("express");
const bookController = require("../Controllers/bookController");

const router = express.Router();

router
  .route("/")
  .get(bookController.getEverything)
  .post(bookController.createBook);

router.route("/all/:userId").get(bookController.getAll);

router
  .route("/:id")
  .patch(bookController.changeBook)
  .delete(bookController.deleteBook);

module.exports = router;
