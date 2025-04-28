import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./components/Homepage.jsx";
import AllMovies from "./components/AllMovies";
import Watchlist from "./components/Watchlist";
import RatedFiveStars from "./components/RatedFiveStars";
import Moviedetails from "./components/Moviedetails";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedAccount = localStorage.getItem("account");
    if (savedAccount) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  return null; // or a loading spinner if desired
}

function PrivateRoute({ children }) {
  const savedAccount = localStorage.getItem("account");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!savedAccount || isLoggedIn !== "true") {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/Homepage"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-movies"
            element={
              <PrivateRoute>
                <AllMovies />
              </PrivateRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/rated-5-stars"
            element={
              <PrivateRoute>
                <RatedFiveStars />
              </PrivateRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <PrivateRoute>
                <Moviedetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
