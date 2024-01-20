import Book from "../models/bookModel.js";
import User from "../models/userModel.js";

// Get all books along with copies available
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate("user_id", "firstName lastName");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get book by title
const getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title});
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getBookById = async (req, res) =>{
  try
  {
    const book = await Book.findById( req.params.id);
    if (book)
    {
      res.status(201).json(book);
    }
    else
    {
      res.status(404).json({error: "Boob not found"});
    }
  }
  catch(error)
  {
    res.status(500).json({error: error.message});
  }
}

//deletebook
const deleteBookById = async (req, res) =>{
  try
  {
    const book = await Book.findById(req.params.id);
    if(book)
    {
      await book.remove();
      res.status(200).json({message: "Book removed successfully"});
    }
    else
    {
      res.status(404).json({error: "Book not found"});
    }
  }
  catch(error)
  {
    res.status(500).json({error: error.message});
  }
}
//get book by author name
const getBookByAuthor = async (req, res) => {
  try {
    const book = await Book.findOne({ author: req.params.author });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//get book by genre
const getBookByGenre = async (req, res) => {
  try {
    const book = await Book.findOne({ genre: req.params.genre });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// update book details
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.genre = req.body.genre || book.genre;
      book.ISBN = req.body.ISBN || book.ISBN;
      book.publishDate = req.body.publishDate || book.publishDate;
      book.noOfCopies = req.body.noOfCopies || book.noOfCopies;
      book.availableCopies = req.body.availableCopies || book.availableCopies;
      await book.save();
      res.status(200).json({ message: "Book details updated successfully" });
    } else {
      res.status(400).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





const createBook = async(req, res)=>
{
  try
  {
     const {title,author,genre,ISBN,publishDate,noOfCopies,availableCopies} = req.body;
     const book = new Book
     ({
      title,
      author,
      genre,
      ISBN,
      publishDate,
      noOfCopies,
      availableCopies
     }
     )
     await book.save();
     res.status(200).json({message: "New book created successfully"});
  }
  catch(error)
  {
    res.status(500).json({error : error.message});
  }
};
export { getBooks, getBookByTitle, getBookByAuthor, getBookByGenre, updateBook,createBook,getBookById,deleteBookById };