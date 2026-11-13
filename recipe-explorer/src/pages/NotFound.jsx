// Import Link from React Router to enable navigation without reloading the page.
import { Link } from 'react-router-dom';

// NotFound component displays an error page when a requested page does not exist.
function NotFound() {

  return (

    // Main container with centered content and vertical padding.
    <div className="container text-center py-5">

      {/* Display the 404 error code to indicate that the page was not found. */}
      <h1 className="display-1 fw-bold text-danger">
        404
      </h1>

      {/* Display the page not found heading. */}
      <h2>Page Not Found</h2>

      {/* Provide a friendly message explaining that the requested page is unavailable. */}
      <p className="text-muted">
        Sorry! The page you're looking for doesn't exist.
      </p>

      {/* Provide a navigation button that takes users back to the homepage. */}
      <Link to="/" className="btn recipe-btn mt-3">
        <i className="bi bi-house me-2"></i>
        Back to Home
      </Link>

    </div>

  );

}

// Export the NotFound component so it can be used in application routing.
export default NotFound;