function displayMovieCards(movies) {
  const movieListContainer = document.getElementById("movieList");
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card", "m-2", "col-5");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-text");
    title.textContent = `Title ${movie.title}`;


    cardBody.appendChild(title);

    card.appendChild(cardBody)
    movieListContainer.appendChild(card)

  });
}
displayMovies();
//to display movies

async function displayMovies() {
  const url = `http://localhost:3000/movies`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response.json();
    console.log(data,typeof(data));
    const movies = await data;
    console.log(movies,typeof(movies));
    displayMovieCards(movies);
  } catch (error) {
    console.error("error from db", error);
  }
  document.getElementById("movieList");
}

//to search movies

async function searchMovies() {
  let searchTerm = document.getElementById("searchInput").value;
  const url = `http://localhost:3000/movies?query=${searchTerm}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response.json();
    console.log(data);
  } catch (error) {
    console.error("error from db", error);
  }
}
