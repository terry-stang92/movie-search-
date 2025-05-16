const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");

const API_KEY = "6b0a692c";

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const movieName = searchInput.value.trim();

    if (movieName === "") return;

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`)
      .then((response) => response.json())
      .then((data) => {
        movieResults.innerHTML = ""; // Clear previous results

        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            movieResults.innerHTML += `
              <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}" />
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
              </div>
            `;
          });
        } else {
          movieResults.innerHTML = `<p class="not-found">Movie not found</p>`;
        }
      })
      .catch((error) => {
        movieResults.innerHTML = `<p class="not-found">Error fetching movie</p>`;
        console.error("Error:", error);
      });
  }
});
