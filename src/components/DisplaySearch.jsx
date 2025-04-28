function DisplaySearch({ selectedMovie }) {
  return (
    <div className="homepage-container">
      <h2>Display Search</h2>

      {selectedMovie ? (
        <div className="movie-display">
          <h3>{selectedMovie.title}</h3>
          <p><strong>Genre:</strong> {selectedMovie.genre}</p>
          
        </div>
      ) : (
        <p>No movie selected. Please search for a movie.</p>
      )}
    </div>
  );
}

export default DisplaySearch;