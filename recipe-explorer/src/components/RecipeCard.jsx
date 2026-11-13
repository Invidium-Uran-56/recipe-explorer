// Import Link from React Router to navigate to the recipe details page.
import { Link } from 'react-router-dom';

// RecipeCard component receives recipe details through props.
function RecipeCard({ recipe }) {
  return (
    // Bootstrap grid column to make the recipe card responsive.
    <div className="col-lg-4 col-md-6 mb-4">

      {/* Card container with shadow, no border, and full height. */}
      <div className="card recipe-card h-100 border-0 shadow-sm">

        {/* Display the recipe image with alternative text for accessibility. */}
        <img
          src={recipe.strMealThumb}
          className="card-img-top recipe-image"
          alt={recipe.strMeal}
        />

        <div className="card-body">

          {/* Display the name of the recipe. */}
          <h5 className="card-title fw-bold">
            {recipe.strMeal}
          </h5>

          {/* Navigate to the selected recipe's details page using its ID. */}
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

// Export the RecipeCard component so it can be reused in other components.
export default RecipeCard;