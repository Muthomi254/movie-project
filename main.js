// document.addEventListener('DOMContentLoaded', function () {
//   const searchInput = document.getElementById('searchInput');
//   const movieList = document.getElementById('movieList');
//   const addMovieForm = document.getElementById('addMovieForm');
//   const searchButton = document.querySelector('#searchForm button');
//   const addMovieButton = document.querySelector('#addMovieForm button');

//   let movies = [];

//   // Initial display of movies
//   fetchMovies();

//   // Search movies
//   searchButton.addEventListener('click', function () {
//     const searchTerm = searchInput.value.trim().toLowerCase();
//     searchMovies(searchTerm);
//   });

//   // Add movie
//   addMovieButton.addEventListener('click', function () {
//     const title = document.getElementById('title').value.trim();
//     const description = document.getElementById('description').value.trim();
//     const director = document.getElementById('director').value.trim();
//     const rating = parseFloat(document.getElementById('rating').value.trim());
//     const posterImageUrl = document.getElementById('posterImageUrl').value.trim();

//     if (title && description && director && !isNaN(rating) && posterImageUrl) {
//       const newMovie = {
//         title: title,
//         description: description,
//         director: director,
//         rating: rating,
//         posterImageUrl: posterImageUrl,
//       };

//       addMovie(newMovie);
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

//   // Function to make a GET request to search movies
//   async function searchMovies(searchTerm) {
//     try {
//       const response = await fetch(`http://localhost:3000/movies?q=${searchTerm}`);
//       const data = await response.json();
//       displayMovies(data.movies || []);
//     } catch (error) {
//       console.error('Error searching movies:', error.message);
//     }
//   }

//   // Function to make a POST request to add a movie
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
//       movies = data.movies || [];
//       displayMovies(movies);
//       addMovieForm.reset();
//     } catch (error) {
//       console.error('Error adding movie:', error.message);
//     }
//   }

//   // Function to display movies in the movie list container
//   function displayMovies(movieArray) {
//     movieList.innerHTML = '';

//     movieArray.forEach(function (movie) {
//       const movieCard = createMovieCard(movie);
//       movieList.appendChild(movieCard);
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

//     const directorInfo = document.createElement('p');
//     directorInfo.classList.add('card-body');
//     directorInfo.innerHTML = `<strong>Director:</strong> ${movie.director}`;

//     const ratingInfo = document.createElement('p');
//     ratingInfo.classList.add('card-body');
//     ratingInfo.innerHTML = `<strong>Rating:</strong> ${movie.rating}`;

//     const posterImage = document.createElement('img');
//     posterImage.classList.add('card-img-top');
//     posterImage.src = movie.posterImageUrl;
//     posterImage.alt = movie.title;

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
//     cardBody.appendChild(directorInfo);
//     cardBody.appendChild(ratingInfo);
//     cardBody.appendChild(posterImage);
//     cardBody.appendChild(buttonGroup);

//     card.appendChild(cardBody);

//     return card;
//   }
// });

// test 2

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const movieList = document.getElementById('movieList');
  const searchButton = document.querySelector('#searchForm button');

  // Initial display of movies
  fetchMovies();

  // Search movies
  searchButton.addEventListener('click', function () {
    searchMovies();
  });

  // Function to fetch movies from the server
  async function fetchMovies() {
    try {
      // Make a fetch request to get all movies
      const response = await fetch('http://localhost:3000/movies');
      const data = await response.json();

      // Display the movies
      displayMovies(data.movies || []);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    }
  }

  // Function to make a GET request to search movies
  async function searchMovies() {
    // Get the search input value
    const searchTerm = searchInput.value.trim().toLowerCase();

    try {
      // Make a fetch request to search movies
      const response = await fetch(`http://localhost:3000/movies?q=${searchTerm}`);
      const data = await response.json();

      // Display the search results
      displayMovies(data.movies || []);
    } catch (error) {
      console.error('Error searching movies:', error.message);
    }
  }

  // Function to display movies in the movie list container
  function displayMovies(movieArray) {
    movieList.innerHTML = '';

    movieArray.forEach(function (movie) {
      const movieCard = createMovieCard(movie);
      movieList.appendChild(movieCard);
    });
  }

  // Function to create a movie card
  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card', 'h-100');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-header');
    cardTitle.textContent = movie.title;

    const cardText = document.createElement('p');
    cardText.classList.add('card-body');
    cardText.textContent = movie.description;

    const directorInfo = document.createElement('p');
    directorInfo.classList.add('card-body');
    directorInfo.innerHTML = `<strong>Director:</strong> ${movie.director}`;

    const ratingInfo = document.createElement('p');
    ratingInfo.classList.add('card-body');
    ratingInfo.innerHTML = `<strong>Rating:</strong> ${movie.rating}`;

    const posterImage = document.createElement('img');
    posterImage.classList.add('card-img-top');
    posterImage.src = movie.posterImageUrl;
    posterImage.alt = movie.title;

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group');

    const updateBtn = document.createElement('button');
    updateBtn.classList.add('btn', 'btn-info', 'update-btn');
    updateBtn.textContent = 'Update';
    updateBtn.dataset.id = movie.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = movie.id;

    buttonGroup.appendChild(updateBtn);
    buttonGroup.appendChild(deleteBtn);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(directorInfo);
    cardBody.appendChild(ratingInfo);
    cardBody.appendChild(posterImage);
    cardBody.appendChild(buttonGroup);

    card.appendChild(cardBody);

    return card;
  }})