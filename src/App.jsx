
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Homepage from './components/Homepage.jsx';
import Searchbar from './components/Searchbar.jsx';
import Watchlist from './components/Navbar/Watchlist.jsx';
import Rating from './components/Navbar/Rating.jsx';

function App() {
  const appStyle = {
    position: "relative",
    minHeight: "100vh",
    padding: "2rem",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        <h1>Welcome to Movie Mix</h1>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Searchbar />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/rating" element={<Rating />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
