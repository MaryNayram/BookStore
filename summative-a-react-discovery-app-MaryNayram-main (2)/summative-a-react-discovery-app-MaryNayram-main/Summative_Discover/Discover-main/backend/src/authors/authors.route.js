const express = require("express");
const Author = require("./authors.model");
const router = express.Router();

// CREATE Author
router.post("/", async (req, res) => {
  try {
    const { name, image, bio } = req.body;
    if (!name || !image || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAuthor = new Author({ name, image, bio });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET All Authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.status(200).json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET Single Author
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
