// function displayMovieCards(movies) {
//   const movieListContainer = document.getElementById("movieList");
//   movies.forEach((movie) => {
//     const card = document.createElement("div");
//     card.classList.add("card", "m-2", "col-5");

//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");

//     const title = document.createElement("h5");
//     title.classList.add("card-text");
//     title.textContent = `Title ${movie.title}`;
    


//     cardBody.appendChild(title);

//     card.appendChild(cardBody)
//     movieListContainer.appendChild(card)

//   });
// }
// displayMovies();
// //to display movies

// async function displayMovies() {
//   const url = `http://localhost:3000/movies`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }
//     const data = response.json();
//     console.log(data,typeof(data));
//     const movies = await data;
//     console.log(movies,typeof(movies));
//     displayMovieCards(movies);
//   } catch (error) {
//     console.error("error from db", error);
//   }
//   document.getElementById("movieList");
// }

// //to search movies

// async function searchMovies() {
//   let searchTerm = document.getElementById("searchInput").value;
//   const url = `http://localhost:3000/movies?query=${searchTerm}`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }
//     const data = response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("error from db", error);
//   }
// }


document.addEventListener('DOMContentLoaded', function () {
  // Search Button Click Event
  document.getElementById('searchBtn').addEventListener('click', function () {
      const searchInput = document.getElementById('searchInput').value;
      searchMovies(searchInput);
  });
});

async function searchMovies(query) {
  try {
      const response = await fetch(`http://localhost:3000/movies?q=${query}`);
      const movies = await response.json();

      displayMoviesToHtml(movies);
  } catch (error) {
      console.error('Error fetching movies:', error);
  }
}

function displayMoviesToHtml(movies) {
  const movieListContainer = document.getElementById('movieList');
  movieListContainer.innerHTML = ''; // Clear previous movies

  movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'card movie_card';
      movieCard.id = movie.id;

      movieCard.innerHTML = `
          <img src="${movie.posterImageUrl}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">${movie.description}</p>
              <span class="movie_info"><i class="fa fa-user"></i> ${movie.director}</span>
              <span class="movie_info float-right"><i class="fa fa-star"></i> ${movie.rating}</span>
          </div>
      `;

      movieListContainer.appendChild(movieCard);
  });

}

async function addMovie() {
  // Get input values from the form
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const director = document.getElementById('director').value;
  const rating = parseFloat(document.getElementById('rating').value);
  const posterImageUrl = document.getElementById('posterImageUrl').value;

  // Create a movie object
  const movie = {
    title: title,
    description: description,
    director: director,
    rating: rating,
    posterImageUrl: posterImageUrl
  };

  try {
    // Make a POST request to add the movie
    const response = await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    });

    if (response.ok) {
      // Movie added successfully, clear the form
      document.getElementById('addMovieForm').reset();
      alert('Movie added successfully!');
    } else {
      // Display an error message if something went wrong
      alert('Failed to add movie. Please try again.');
    }
  } catch (error) {
    // Handle any network or other errors
    console.error('Error adding movie:', error);
    alert('An error occurred. Please try again.');
  }
}
