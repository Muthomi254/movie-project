const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Your movies data (replace this with your actual data or connect to a database)
const movies = require('./db.json').movies;

// Routes

// Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get movie by ID
app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Search movies
app.get('/movies/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const searchResults = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );

  res.json(searchResults);
});

// Add a new movie
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies.length + 1;

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

// Update a movie
app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovie = req.body;

  const index = movies.findIndex((m) => m.id === movieId);

  if (index !== -1) {
    movies[index] = { ...movies[index], ...updatedMovie };
    res.json(movies[index]);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Delete a movie
app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const index = movies.findIndex((m) => m.id === movieId);

  if (index !== -1) {
    const deletedMovie = movies.splice(index, 1)[0];
    res.json(deletedMovie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
