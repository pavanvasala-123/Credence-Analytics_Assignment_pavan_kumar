const Book = require("../Models/model");

// Note: As you mentioned on file the data is looking related to books data
// for better naming purposes i am using names releted to book like get_book..etc.

// Create Api  http://localhost:3000/Books/create-book

const create_book = async (req, res) => {
  const { name, img, summary } = req.body;

  try {
    if (!name || !img || !summary) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await Book.create({ name, img, summary });
    return res.status(201).json(result); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }

};


// Get All data  http://localhost:3000/Books/get-all-books
const get_all_books = async (req, res) => {
  try {
    const result = await Book.find();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

//get single data based on id or name  http://localhost:3000/Books/get-book?id or name
const get_book = async (req, res) => {
  const { id, name } = req.query;

  console.log(id);

  let book;
  try {
    if (id) {
      book = await Book.findById(id);
    } else if (name) {
      book = await Book.findOne({
        name: { $regex: name, $options: "i" },
      });
    }
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update data based on id or name  http://localhost:3000/Books/update-book?id or name
const update_book = async (req, res) => {
  const { id, name } = req.query;

  try {
    let existing_book;
    if (id) {
      existing_book = await Book.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
    } else if (name) {
      existing_book = await Book.findOneAndUpdate(
        { name: { $regex: name, $options: "i" } },
        { $set: req.body },
        { new: true, runValidators: true }
      );
    }

    if (!existing_book) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      res
        .status(200)
        .json({ message: "Book updated successfully", data: existing_book });
    }
  } catch (err) {
    res.status(500).json("Server error" + err);
  }
};

// delete book based on id and name  http://localhost:3000/Books/delete-book?id or name
const delete_book = async (req, res) => {
  const { id, name } = req.query;
  try {
    let deleted_book;
    if (id) {
      deleted_book = await Book.findByIdAndDelete(id);
    } else if (name) {
      deleted_book = await Book.deleteOne({
        name: { $regex: name, $options: "i" },
      });
    }

    if (deleted_book) {
      if (deleted_book.deletedCount === 0) {
        // For deleteOne, if no document matched the query
        res.status(404).json({ message: "No book found to delete." });
      } else {
        res
          .status(200)
          .json({ message: "Book deleted successfully.", deleted_book });
      }
    } else {
      res.status(404).json({ message: "No book found to delete." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Deleting all books in the database http://localhost:3000/Books/delete-all-books 

const delete_all_books = async (req, res) => {
  try {
    const deleted_books = await Book.deleteMany();
    res
      .status(200)
      .json({ message: "Books deleted successfully.", deleted_books });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  create_book,
  get_all_books,
  update_book,
  get_book,
  delete_book,
  delete_all_books,
};
