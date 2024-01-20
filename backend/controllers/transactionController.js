import Transaction from '../models/transactionModel.js';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

// borrow a book
const borrowBook = async (req, res) => {
    try {
        const { book_id, issueDate } = req.body;
    
        const book = await Book.findById(book_id);
        const user = await User.findById(req.user.userId);
    
        if (book) {
        if (book.availableCopies > 0) {
            book.availableCopies -= 1;
            book.save();
            const returnDate = new Date(issueDate);
            returnDate.setDate(returnDate.getDate() + 7);
            const transaction = new Transaction({
            user_id: req.user.userId,
            book_id,
            issueDate,
            returnDate,
            returnStatus,
            });
            await transaction.save();
            res.status(201).json({ message: 'Book borrowed successfully' });
        } else {
            res.status(400).json({ error: 'Book not available' });
        }
        } else {
        res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }
//return the book
const returnBook = async (req, res) => {
    try
    {
        const { book_id, returnDate } = req.body;
        const book = await Book.findById(book_id);
        const user = await User.findById(req.user.userId);
        if (book) {
            book.availableCopies += 1;
            book.save();
            const transaction = await Transaction.findOne({ book_id, user_id: req.user.userId });
            if (transaction) {
                if(transaction.returnDate < new Date())
                {
                    //calculate the fine such that 1 day = 10 rupee
                    const diffTime = Math.abs(transaction.returnDate - new Date());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    transaction.fine = diffDays * 10;
                    transaction.returnDate = returnDate;
                    transaction.returnStatus = 'Returned with fine';
                    await transaction.save();
                }
                transaction.returnDate = returnDate;
                transaction.returnStatus = 'Returned';
                await transaction.save();
                res.status(200).json({ message: 'Book returned successfully' });
            } else {
                res.status(404).json({ error: 'Transaction not found' });
            }
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } 
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
};    

export {borrowBook,returnBook};