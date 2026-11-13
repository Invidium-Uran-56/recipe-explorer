// Import Link from React Router to enable navigation without reloading the page.
import { Link } from 'react-router-dom';

// Navbar component for navigating between different pages of the application.
function Navbar() {
  return (
    // Main navigation bar with Bootstrap styling.
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        {/* Brand logo and application name. Clicking it navigates to the home page. */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-egg-fried me-2 text-danger"></i>
          Recipe Explorer
        </Link>

        {/* Toggle button for displaying the navigation menu on smaller screens. */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible navigation menu. */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Navigation links aligned to the right side of the navbar. */}
          <ul className="navbar-nav ms-auto">

            {/* Link to the Discover Recipes page. */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Discover Recipes
              </Link>
            </li>

            {/* Link to the Meal Planner page. */}
            <li className="nav-item">
              <Link className="nav-link" to="/meal-planner">
                Meal Planner
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

// Export the Navbar component so it can be used throughout the application.
export default Navbar;