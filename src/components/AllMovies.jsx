import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/AllMovies.css";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
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

    fetchAllMovies();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="all-movies">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>All Movies</h1>
      </div>

      {error && <p className="error">Error: {error.message}</p>}
      {movies.length === 0 && !error && <p>No movies available.</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            {movie.image && (
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
              </div>
            )}
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>
                <span>Genre:</span> {movie.genre}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}/10
              </p>
              <p>
                <span>Year:</span> {movie.releaseYear}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
