import React, { useState, useEffect } from "react";
import "../style/AllMovies.css";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Add a movie to the watchlist
  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // Rate a movie and send it to the rated movies list
  const rateMovie = async (movie, rating) => {
    const ratedMovie = { ...movie, userRating: rating };
    try {
      await fetch("http://localhost:3001/ratedFiveStars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratedMovie),
      });
      setRatedMovies([...ratedMovies, ratedMovie]);
    } catch (error) {
      console.error("Failed to rate movie:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="all-movies">
      <h1>All Movies</h1>
      {error && <p className="error">Error: {error.message}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-image">
              <img src={movie.image} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <button onClick={() => addToWatchlist(movie)}>
                Add to Watchlist
              </button>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} onClick={() => rateMovie(movie, rating)}>
                    {rating} ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
