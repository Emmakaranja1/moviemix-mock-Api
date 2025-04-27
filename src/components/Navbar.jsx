import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/Homepage">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
    <Link to="/all-movies">All Movies</Link>
    <Link to="/watchlist">Watchlist</Link>
    <Link to="/rated-5-stars">Rated 5 Stars</Link>
  </nav>
);

export default Navbar;
