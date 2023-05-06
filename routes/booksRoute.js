const express = require("express");
const { BookModel } = require("../models/bookModel");
const { privateRoute } = require("../middlewares/loginMiddleware");
const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  try {
    const data = await BookModel.find(req.query);
    if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res.status(201).send("No book found.");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

booksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const data = await BookModel.find({ _id: id });
    if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res.status(401).send("No book found.");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// To make the post,delete and patch routes private adding the middleware here
booksRouter.use(privateRoute);

booksRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    if (
      !data.title ||
      !data.author ||
      !data.price ||
      !data.quantity ||
      !data.category
    ) {
      res.send("Provide all the details of the book.");
    } else {
      const newBook = new BookModel(data);
      await newBook.save();
      res.status(201).send("New Book data has been added to the database.");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

booksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BookModel.findByIdAndDelete({ _id: id });
    res.status(202).send("Deleted Successfully.");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

booksRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await BookModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(202).send("Updated Successfully.");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = { booksRouter };
