import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">

      <div className="card recipe-card h-100 border-0 shadow-sm">

        <img
          src={recipe.strMealThumb}
          className="card-img-top recipe-image"
          alt={recipe.strMeal}
        />

        <div className="card-body">

          <h5 className="card-title fw-bold">
            {recipe.strMeal}
          </h5>

          <Link
            to={`/recipe/${recipe.idMeal}`}
            className="btn recipe-btn mt-3"
          >
            View Recipe
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default RecipeCard;