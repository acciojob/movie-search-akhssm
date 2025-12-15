import React, { useState } from "react";

const API_KEY = "99eb9fd1";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = (e) => {
    e.preventDefault();

    setError("");
    setMovies([]);

    if (!query.trim()) {
      setError("Invalid movie name. Please try again.");
      return;
    }

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setError("Invalid movie name. Please try again.");
        } else {
          setMovies(data.Search);
        }
      })
      .catch(() => {
        setError("Invalid movie name. Please try again.");
      });
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search Movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
