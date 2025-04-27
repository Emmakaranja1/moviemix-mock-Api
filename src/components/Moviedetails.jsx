import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/Moviedetails.css";

const Moviedetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movies/${id}`);
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!movieDetails) {
    return <div className="not-found">Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <div className="back-button">
        <Link to="/">← Back to Movies</Link>
      </div>

      <div className="movie-content">
        <div className="movie-header">
          <h1>{movieDetails.title}</h1>

          <div className="movie-meta">
            <div className="meta-item">
              <span>Genre</span>
              <p>{movieDetails.genre}</p>
            </div>

            <div className="meta-item">
              <span>Release Year</span>
              <p>{movieDetails.releaseYear}</p>
            </div>

            <div className="meta-item">
              <span>Rating</span>
              <p>{movieDetails.rating}/10</p>
            </div>
          </div>
        </div>

        <div className="rating-visual">
          <div className="rating-bar">
            <div
              className="rating-fill"
              style={{ width: `${(movieDetails.rating / 10) * 100}%` }}
            ></div>
          </div>
          <p className="rating-label">Rating: {movieDetails.rating}/10</p>
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;
