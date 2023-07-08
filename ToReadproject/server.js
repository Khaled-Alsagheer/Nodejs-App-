const express = require("express"); 

const app = express() ; 


app.get("/" , (req , res)=>{
        res.send("Welcome ToRead Library ..."); 
})

const books = [
    { isbn: '1234567890', title: 'Book 1', author: 'Author 1', reviews: [] },
    { isbn: '0987654321', title: 'Book 2', author: 'Author 2', reviews: [] },
    { isbn: '2468013579', title: 'Book 3', author: 'Author 3', reviews: [] },
    { isbn: '9876543210', title: 'Book 4', author: 'Author 4', reviews: [] },
    { isbn: '1357902468', title: 'Book 5', author: 'Author 5', reviews: [] },
    { isbn: '2468135790', title: 'Book 6', author: 'Author 6', reviews: [] },
    { isbn: '1357924680', title: 'Book 7', author: 'Author 7', reviews: [] },
    { isbn: '3692581470', title: 'Book 8', author: 'Author 8', reviews: [] },
    { isbn: '2581470369', title: 'Book 9', author: 'Author 9', reviews: [] },
    { isbn: '1470369258', title: 'Book 10', author: 'Author 10', reviews: [] },
];

  app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  });

  app.get('/books/author/:author', (req, res) => {
  const { author } = req.params;
  const booksByAuthor = books.filter(b => b.author === author);
  if (booksByAuthor.length === 0) {
    return res.status(404).send('No books found for the author');
  }
  res.json(booksByAuthor);
});

app.get('/books/title/:title', (req, res) => {
    const { title } = req.params;
    const booksByTitle = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    if (booksByTitle.length === 0) {
      return res.status(404).send('No books found for the title');
    }
    res.json(booksByTitle);
  });

  app.get('/books/:isbn/reviews', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book.reviews);
  });
  
  const bodyParser = require('body-parser');
  const uuid = require('uuid');
  app.use(bodyParser.json());
  const users = [];
app.get('/', (req, res) => {
  res.send('Welcome to the library!');
});
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send('Please provide name, email, and password');
  }
  const id = uuid.v4();
  const newUser = { id, name, email, password };
  users.push(newUser);
  res.json(newUser);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Please provide email and password');
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    res.json(user);
  });


  app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  });
  
  app.post('/books/:id/reviews', (req, res) => {
    const { userId, rating, comment } = req.body;
    if (!userId || !rating || !comment) {
      return res.status(400).send('Please provide userId, rating, and comment');
    }
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    const review = { userId, rating, comment };
    book.reviews.push(review);
    res.json(book);
  });
  
  app.put('/books/:id/reviews/:userId', (req, res) => {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).send('Please provide rating and comment');
    }
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    const review = book.reviews.find(r => r.userId === req.params.userId);
    if (!review) {
      return res.status(404).send('Review not found');
    }
    review.rating = rating;
    review.comment = comment;
    res.json(book);
  });

  app.delete('/books/:id/reviews/:userId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    const reviewIndex = book.reviews.findIndex(r => r.userId === req.params.userId);
    if (reviewIndex === -1) {
      return res.status(404).send('Review not found');
    }
    book.reviews.splice(reviewIndex, 1);
    res.json(book);
  });


  const User = require('./models/user');

function getAllUsers(callback) {
  User.find({}, (err, users) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
}

getAllUsers((err, users) => {
  if (err) {
    console.error(err);
  } else {
    console.log(users);
  }
});


const Book = require('./models/book');

function searchBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    Book.findOne({ isbn: isbn }, (err, book) => {
      if (err) {
        reject(err);
      } else {
        resolve(book);
      }
    });
  });
}

searchBookByISBN('978-3-16-148410-0')
  .then((book) => {
    console.log(book);
  })
  .catch((err) => {
    console.error(err);
  });


app.listen(3000 , ()=>{
    console.log("server started on port 3000 "); 
})