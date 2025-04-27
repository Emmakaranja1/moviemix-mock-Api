import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Moviedetails.css";

const Moviedetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movies/${id}`);
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} className="movie-poster" />
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}/10</p>
      <p>Year: {movie.releaseYear}</p>
      <p>{movie.description}</p>
    </div>
  );
};

export default Moviedetails;
