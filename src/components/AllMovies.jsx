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
    setWatchlist([...watchlist, movie]);
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

  // Removed duplicate rateMovie function declaration
};

export default AllMovies;
