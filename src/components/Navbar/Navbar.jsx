import { Link } from 'react-router-dom';
import Home_icon from '../../assets/Home-icon.png';
import Logo_icon from '../../assets/Logo-icon.png';
import Watchlist_icon from '../../assets/Watchlist-icon.png';
import Search_icon from '../../assets/Search-icon.png';
import Rating_icon from '../../assets/Rating-icon.png';

import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={Logo_icon} alt="App Logo" />
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/Homepage">
            <img src={Home_icon} alt="Home Icon" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/watchlist">
            <img src={Watchlist_icon} alt="Watchlist Icon" />
            <span>Watchlist</span>
          </Link>
        </li>
        <li>
          <Link to="/rating">
            <img src={Rating_icon} alt="Rating Icon" />
            <span>Rating</span>
          </Link>
        </li>
      </ul>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <img src={Search_icon} alt="Search Icon" />
      </div>

      <div className="auth-links">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;