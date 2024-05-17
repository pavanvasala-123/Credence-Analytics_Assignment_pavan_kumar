const express = require("express");

const {
  create_book,
  get_all_books,
  update_book,
  get_book,
  delete_book,
  delete_all_books,
} = require("../Controllers/controller");

const router = express.Router();

router.post("/create-book", create_book);

router.get("/get-all-books", get_all_books).get(`/get-book`, get_book);

router.put("/update-book", update_book);

router
  .delete("/delete-book", delete_book)
  .delete("/delete-all-books", delete_all_books);

module.exports = router;
