import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Searchbar({ setSelectedMovie }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (!query.trim()) {
      setSelectedMovie(null);
      alert('Please enter a movie title to search.');
      return;
    }

    setIsLoading(true);

    axios
      .get('http://localhost:3001/movies') 
      .then((response) => {
        const movies = response.data;
        const foundMovie = movies.find(
          (movie) => movie.title.toLowerCase().trim() === query.toLowerCase().trim()
        );

        if (foundMovie) {
          setSelectedMovie(foundMovie);
          navigate('/display-search'); 
        } else {
          setSelectedMovie(null);
          alert('No movie found with that exact title.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert(`An error occurred: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search exact movie title..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}

export default Searchbar;