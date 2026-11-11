import { Link } from 'react-router-dom';

function NotFound() {

  return (

    <div className="container text-center py-5">

      <h1 className="display-1 fw-bold text-danger">
        404
      </h1>

      <h2>Page Not Found</h2>

      <p className="text-muted">
        Sorry! The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="btn recipe-btn mt-3">
        <i className="bi bi-house me-2"></i>
        Back to Home
      </Link>

    </div>

  );

}

export default NotFound;