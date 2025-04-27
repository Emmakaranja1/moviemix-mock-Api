import React, { useState, useEffect } from "react";
import "../style/Homepage.css";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/movies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovies();
  }, []); // Add empty dependency array to prevent infinite loops

  return (
    <div className="homepage">
      <h1>Movie Mix</h1>
      {error && <p className="error">Error: {error.message}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Year: {movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
