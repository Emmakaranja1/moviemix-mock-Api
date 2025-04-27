import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        // Replace this with your actual watchlist data source
        const response = await fetch("http://localhost:3001/watchlist");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="watchlist">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>My Watchlist</h1>
      </div>

      {error && <p className="error">Error: {error.message}</p>}
      {watchlist.length === 0 && !error && <p>Your watchlist is empty.</p>}
      <div className="movie-list">
        {watchlist.map((movie) => (
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

export default Watchlist;
