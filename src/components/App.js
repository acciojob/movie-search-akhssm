import React, { useState } from "react";

const API_KEY = "99eb9fd1";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = () => {
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
    <div className="container">
      <input
        type="text"
        placeholder="Search Movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
