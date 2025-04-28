
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; 
import './App.css';

import Profile from './Profile.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './components/Navbar.jsx';
import Homepage from './components/Homepage.jsx'; 
import AllMovies from './components/AllMovies.jsx';
import Watchlist from './components/Watchlist.jsx';
import RatedFiveStars from './components/RatedFiveStars.jsx';
import DisplaySearch from './components/DisplaySearch.jsx'; 



function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        
        <Routes>

          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} /> 
          <Route path="/display-search" element={<DisplaySearch selectedMovie={selectedMovie} />} /> 
          <Route path="/all-movies" element={<AllMovies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/rated-5-stars" element={<RatedFiveStars />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

