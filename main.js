const MODE = 'dev';
// Deployed version
// const BASEURL = "https://movie-zone-g3b3.onrender.com";

// Local version
const BASEURL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  // Search Button Click Event
  document.getElementById("searchBtn").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value;
    searchMovies(searchInput);
  });
});

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASEURL}/movies?q=${query}`);
    const movies = await response.json();

    displayMoviesToHtml(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMoviesToHtml(movies) {
  const movieListContainer = document.getElementById("movieList");
  movieListContainer.innerHTML = ""; // Clear previous movies

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "card movie_card";
    movieCard.id = movie.id;

    movieCard.innerHTML = `
        <img src="${movie.posterImageUrl}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h6 class="id">ID: ${movie.id}</h6>
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
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const director = document.getElementById("director").value;
  const rating = parseFloat(document.getElementById("rating").value);
  const posterImageUrl = document.getElementById("posterImageUrl").value;

  // Create a movie object
  const movie = {
    title: title,
    description: description,
    director: director,
    rating: rating,
    posterImageUrl: posterImageUrl,
  };

  try {
    // Make a POST request to add the movie
    const response = await fetch(`${BASEURL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (response.ok) {
      // Movie added successfully, clear the form
      document.getElementById("addMovieForm").reset();
      alert("Movie added successfully!");
    } else {
      // Display an error message if something went wronghttps://m.media-amazon.com/images/I/51dze-kZUTL.__AC_SX300_SY300_QL70_FMwebp_.jpg
      alert("Failed to add movie. Please try again.");
    }
  } catch (error) {
    // Handle any network or other errors
    console.error("Error adding movie:", error);
    alert("An error occurred. Please try again.");
  }
}

// Function to update a movie
async function updateMovie() {
  // Get the values from the update form
  const updateMovieId = document.getElementById("updateMovieId").value;
  const updateTitle = document.getElementById("updateTitle").value;
  const updateDescription = document.getElementById("updateDescription").value;
  const updateDirector = document.getElementById("updateDirector").value;
  const updateRating = document.getElementById("updateRating").value;
  const updatePosterImageUrl = document.getElementById(
    "updatePosterImageUrl"
  ).value;

  // Check if all fields are provided
  if (
    !updateMovieId ||
    !updateTitle ||
    !updateDescription ||
    !updateDirector ||
    !updateRating ||
    !updatePosterImageUrl
  ) {
    alert("Please fill in all the fields to update the movie.");
    return;
  }

  try {
    // Fetch URL for the specific movie ID
    const updateUrl = `${BASEURL}/movies/${updateMovieId}`;

    // Send a PUT request to the backend with updated movie details
    const updateResponse = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateTitle,
        description: updateDescription,
        director: updateDirector,
        rating: updateRating,
        posterImageUrl: updatePosterImageUrl,
      }),
    });

    // Check if the movie was updated successfully
    if (updateResponse.ok) {
      alert(`Movie "${updateTitle}" has been updated successfully.`);
    } else {
      alert("Failed to update the movie. Please try again.");
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    alert("An error occurred while updating the movie. Please try again.");
  }
}

// Function to delete a movie
async function deleteMovie() {
  // Get the movie ID from the delete form
  const deleteMovieId = document.getElementById("deleteMovieId").value;

  // Check if the movie ID is provided
  if (!deleteMovieId) {
    alert("Please enter a Movie ID to delete.");
    return;
  }

  try {
    // Fetch URL for the specific movie ID
    const deleteUrl = `${BASEURL}/movies/${deleteMovieId}`;

    // Send a DELETE request to the backend to delete the movie
    const deleteResponse = await fetch(deleteUrl, {
      method: "DELETE",
    });

    // Check if the movie was deleted successfully
    if (deleteResponse.ok) {
      alert(`Movie with ID ${deleteMovieId} has been deleted successfully.`);
    } else {
      alert("Failed to delete the movie. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    alert("An error occurred while deleting the movie. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch and display movies
  async function displayMovies() {
    try {
      const moviesUrl = `${BASEURL}/movies`;
      const response = await fetch(moviesUrl);
      const movies = await response.json();

      const movieListContainer = document.getElementById("movieList");
      movieListContainer.innerHTML = "";

      if (movies.length === 0) {
        const noMoviesMessage = document.createElement("p");
        noMoviesMessage.textContent = "No movies available.";
        movieListContainer.appendChild(noMoviesMessage);
        return;
      }

      movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("col-md-4", "mb-4");

        movieCard.innerHTML = `
            <div class="card">
              <img src="${movie.posterImageUrl}" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <p class="card-text"><strong>Director:</strong> ${movie.director}</p>
                <p class="card-text"><strong>Rating:</strong> ${movie.rating}</p>
              </div>
            </div>
          `;

        // Append the movie card to the movie list container
        movieListContainer.appendChild(movieCard);
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("An error occurred while fetching movies. Please try again.");
    }
  }

  // Call the displayMovies function when the page loads
  displayMovies();
});
