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
// borrow a book and update the available copies
const borrowBook = async (req, res) => {
  try{
    const book = await Book.findOne(req.params.title);
    if (book.availableCopies >0)
    {
      book.availableCopies= --1;
      await book.save();
      res.status(200).json({ message: "Book borrowed successfully" });
    }
    else
    {
      res.status(404).json({message : "Book not available"});
    }
  }
  catch(error)
  {
    res.status(500).json({error: error.getMessage});
  }
};

const createBook = async(req, res)=>
{
  try
  {
     const {title,author,genre,ISBN,publishDate,noOfCopies,availableCopies} = req.body;
     const  book = new Book
     ({
      title,
      author,
      genre,
      ISBN,
      publishDate,
      noOfCopies,
      availableCopies
     });
     await book.save();
     res.status(200).json({message: "New book created successfully"});
  }
  catch(error)
  {
    res.status(500).json({error : error.Message});
  }
}