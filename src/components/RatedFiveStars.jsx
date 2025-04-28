import React, { useState, useEffect } from "react";
import "../style/RatedFiveStars.css";

const RatedFiveStars = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/ratedFiveStars"); // Fetch rated movies from backend

        // Fetch movies with a rating of 5 stars from db.json

        if (!response.ok) {
          throw new Error("Failed to fetch rated movies");
        }
        const data = await response.json();
        setRatedMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;
  ain;

  return (
    <div className="rated-five-stars">
      <h1>Rated Movies</h1>
      {ratedMovies.length === 0 && <p>No rated movies yet.</p>}
      <div className="movie-list">
        {ratedMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-image">
              <img src={movie.image} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>
                <span>Your Rating:</span> {movie.userRating} ★
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatedFiveStars;
