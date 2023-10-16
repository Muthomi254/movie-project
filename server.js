
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory database for simplicity
let movies = [
  // Your initial set of movies can go here if needed
];

// CORS middleware for handling cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const updatedMovie = req.body;
  movies = movies.map(movie => (movie.id == movieId ? updatedMovie : movie));
  res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  movies = movies.filter(movie => movie.id != movieId);
  res.json({ message: 'Movie deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
