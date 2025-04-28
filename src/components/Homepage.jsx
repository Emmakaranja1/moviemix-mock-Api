import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Homepage.css";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="homepage">
      <h1>Movie Mix</h1>
      <div className="homepage-nav">
        <Link to="/watchlist" className="nav-link">
          Watchlist
        </Link>
        <Link to="/all-movies" className="nav-link">
          All Movies
        </Link>
        <Link to="/rated-5-stars" className="nav-link">
          Rated Five Star
        </Link>
      </div>
      {error && <p className="error">Error: {error.message}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-image">
              <img src={movie.image} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Rating: {movie.rating}/10</p>
              <p>Year: {movie.releaseYear}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
