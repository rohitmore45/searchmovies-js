const input = document.getElementById("inp");
const button = document.getElementById("btn");
const movieslist = document.getElementById("movieslist");

button.addEventListener("click", function () {
  const searchText = input.value;
  //   console.log(searchText);/
  searchMovies(searchText);
});

function searchMovies(st) {
  const apikey = "8d94ca69";
  const apiurl = `https://www.omdbapi.com/?s=${st}&apikey=${apikey}`;

  fetch(apiurl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data)
      displayMovies(data);
    })

    .catch(function (err) {
      console.error(err);
    });
}

function displayMovies(data) {
  if (data.Response === "True") {
    data.Search.forEach(function (movie) {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movieCard");
      movieCard.innerHTML = `
                                       
                <img src=${movie.Poster} alt=${movie.Title}/>
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <a href = "https://www.imdb.com/find/?q=${movie.Title}&ref_=nv_sr_sm" target="_blank">
                <button type="submit">Movie Details</button>
                </a>`

      movieslist.appendChild(movieCard);
    });
  } else {
    movieslist.innerHTML = `<strong>Movie Not Found..Search Another..</strong>`;
  }
}
