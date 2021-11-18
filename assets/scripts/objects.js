// Primitive Values - numbers, strings, booleans, null, undefined, symbol
// Reference values = objects - Arrays, {..}, DOM nodes, everything else
const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];
// Render movies
const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    // check if property is IN object w/o destructuring (if (!("info" in movie)) {})
    // can also do this by putting "movie.info === undefined"
    // object destructuring
    const { info, ...otherProps } = movie;
    console.log(otherProps);
    // object destructuring & changing name
    // const { title: movieTitle } = info;

    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    // call - execute function right away, when you want to override 'this' : first arg = 'this'
    // apply - execute function right away, first arg = 'this', pass addtl arguments as an array
    let text = getFormattedTitle.call(movie) + " - ";
    for (const key in info) {
      if (key !== "title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

// ADD Movie
const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString,
    // this keyword: looks for property in object
    // always the thing in front of the function
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
