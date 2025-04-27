import React, { useState, useEffect } from "react";
import "../style/Homepage.css";

<<<<<<< HEAD:src/components/Navbar/Homepage.jsx
function Homepage () {
  return <div></div>;
=======
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
>>>>>>> 94a4acf2d8e61f52bba7fdeebafd7e30e338d87e:src/components/Homepage.jsx
};

export default Homepage;
