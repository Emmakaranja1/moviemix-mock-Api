import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../style/Moviedetails.css";

const Moviedetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch movie details
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
    return <div className="loading-container">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error.message}</div>;
  }

  if (!movieDetails) {
    return <div className="not-found-container">Movie not found</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Movie Details</h1>
      </div>

      <div className="movie-details-content">
        <div className="movie-poster">
          {movieDetails.image ? (
            <img
              src={movieDetails.image}
              alt={`${movieDetails.title} poster`}
            />
          ) : (
            <div className="no-poster">No image available</div>
          )}
        </div>

        <div className="movie-info-details">
          <h1 className="movie-title">{movieDetails.title}</h1>

          <div className="movie-meta">
            <div className="meta-item">
              <span className="meta-label">Genre</span>
              <p className="meta-value">{movieDetails.genre}</p>
            </div>

            <div className="meta-item">
              <span className="meta-label">Release Year</span>
              <p className="meta-value">{movieDetails.releaseYear}</p>
            </div>

            <div className="meta-item">
              <span className="meta-label">Rating</span>
              <p className="meta-value">{movieDetails.rating}/10</p>
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

          {movieDetails.description && (
            <div className="movie-description">
              <h3>Description</h3>
              <p>{movieDetails.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;
