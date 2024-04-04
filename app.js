const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let books = [
    {id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald'},
    {id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee'},
];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(400).json({message: 'Book not found'});
    }
    res.json(book);
});

app.post('/api/books/:id', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return res.status(404).json({message: 'Book not found'});
    }
    books[index] = {... books[index], ... updatedBook};
    res.json(books[index]);
});

app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return req.status(404).json({message: 'Book not found'});
    }
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});