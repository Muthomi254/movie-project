// document.addEventListener('DOMContentLoaded', function () {
//   const movieListContainer = document.getElementById('movieList');
//   const searchForm = document.getElementById('searchForm');
//   const searchInput = document.getElementById('searchInput');
//   const addMovieForm = document.getElementById('addMovieForm');
//   const searchButton = document.getElementById('searchButton');

//   let movies = [];

//   // Initial display of movies
//   fetchMovies();

//   // Search movies
//   searchForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const searchTerm = searchInput.value.trim().toLowerCase();
//     searchMovies(searchTerm);
//   });

//   // Search movies on button click
//   searchButton.addEventListener('click', function () {
//     const searchTerm = searchInput.value.trim().toLowerCase();
//     searchMovies(searchTerm);
//   });

//   // Add movie
//   addMovieForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const title = document.getElementById('title').value.trim();
//     const description = document.getElementById('description').value.trim();

//     if (title && description) {
//       const newMovie = {
//         title: title,
//         description: description,
//       };

//       addMovie(newMovie);
//       addMovieForm.reset();
//     }
//   });

//   // Update and delete functionality
//   movieListContainer.addEventListener('click', function (event) {
//     const target = event.target;

//     if (target.classList.contains('update-btn')) {
//       const movieId = target.dataset.id;
//       const updatedTitle = prompt('Enter updated title:');
//       const updatedDescription = prompt('Enter updated description:');

//       if (updatedTitle !== null && updatedDescription !== null) {
//         updateMovie(movieId, { title: updatedTitle, description: updatedDescription });
//       }
//     } else if (target.classList.contains('delete-btn')) {
//       const movieId = target.dataset.id;
//       const confirmDelete = confirm('Are you sure you want to delete this movie?');

//       if (confirmDelete) {
//         deleteMovie(movieId);
//       }
//     }
//   });

//   // Function to fetch movies from the server
//   async function fetchMovies() {
//     try {
//       const response = await fetch('http://localhost:3000/movies');
//       const data = await response.json();
//       movies = data.movies || [];
//       displayMovies(movies);
//     } catch (error) {
//       console.error('Error fetching movies:', error.message);
//     }
//   }

//   // Function to search movies from the server
//   async function searchMovies(searchTerm) {
//     try {
//       const response = await fetch(`http://localhost:3000/movies?search=${searchTerm}`);
//       const data = await response.json();
//       movies = data.movies || [];
//       displayMovies(movies);
//     } catch (error) {
//       console.error('Error searching movies:', error.message);
//     }
//   }

//   // Function to add a new movie
//   async function addMovie(newMovie) {
//     try {
//       const response = await fetch('http://localhost:3000/movies', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMovie),
//       });
//       const data = await response.json();
//       updateMovies(data.movies || []);
//     } catch (error) {
//       console.error('Error adding movie:', error.message);
//     }
//   }

//   // Function to update a movie
//   async function updateMovie(movieId, updatedMovie) {
//     try {
//       const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedMovie),
//       });
//       const data = await response.json();
//       updateMovies(data.movies || []);
//     } catch (error) {
//       console.error('Error updating movie:', error.message);
//     }
//   }

//   // Function to delete a movie
//   async function deleteMovie(movieId) {
//     try {
//       const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       updateMovies(data.movies || []);
//     } catch (error) {
//       console.error('Error deleting movie:', error.message);
//     }
//   }

//   // Function to update the local movies array and display movies
//   function updateMovies(updatedMovies) {
//     movies = updatedMovies;
//     displayMovies(movies);
//   }

//   // Function to display movies in the movie list container
//   function displayMovies(movieArray) {
//     movieListContainer.innerHTML = '';

//     movieArray.forEach(function (movie) {
//       const movieCard = createMovieCard(movie);
//       movieListContainer.appendChild(movieCard);
//     });
//   }

//   // Function to create a movie card
//   function createMovieCard(movie) {
//     const card = document.createElement('div');
//     card.classList.add('col-md-4', 'mb-4');

//     const cardBody = document.createElement('div');
//     cardBody.classList.add('card', 'h-100');

//     const cardTitle = document.createElement('h5');
//     cardTitle.classList.add('card-header');
//     cardTitle.textContent = movie.title;

//     const cardText = document.createElement('p');
//     cardText.classList.add('card-body');
//     cardText.textContent = movie.description;

//     const buttonGroup = document.createElement('div');
//     buttonGroup.classList.add('btn-group');

//     const updateBtn = document.createElement('button');
//     updateBtn.classList.add('btn', 'btn-info', 'update-btn');
//     updateBtn.textContent = 'Update';
//     updateBtn.dataset.id = movie.id;

//     const deleteBtn = document.createElement('button');
//     deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.dataset.id = movie.id;

//     buttonGroup.appendChild(updateBtn);
//     buttonGroup.appendChild(deleteBtn);

//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(cardText);
//     cardBody.appendChild(buttonGroup);

//     card.appendChild(cardBody);

//     return card;
//   }
// });
