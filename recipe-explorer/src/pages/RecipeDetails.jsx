import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getRecipeDetails } from '../services/recipeApi.js';

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recipe details
  useEffect(() => {

    const loadRecipe = async () => {

      setLoading(true);
      setError('');

      try {

        const data = await getRecipeDetails(id);

        if (!data) {
          setError('Recipe not found.');
        } else {
          setRecipe(data);
        }

      } catch (err) {

        setError('Unable to load recipe details.');

      } finally {

        setLoading(false);

      }

    };

    loadRecipe();

  }, [id]);


  // Extract ingredients and measurements
  const getIngredients = () => {

    if (!recipe) return [];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {

        ingredients.push({
          ingredient,
          measure
        });

      }

    }

    return ingredients;

  };


  // Loading screen
  if (loading) {

    return (

      <div className="text-center py-5">

        <div className="spinner-border text-danger"></div>

        <p className="mt-3">
          Loading recipe...
        </p>

      </div>

    );

  }


  // Error screen
  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-warning">
          {error}
        </div>

        <Link to="/" className="btn btn-danger">
          Back to Recipes
        </Link>

      </div>

    );

  }


  return (

    <div className="container py-5">

      {/* Back Button */}

      <Link to="/" className="back-link">

        <i className="bi bi-arrow-left me-2"></i>

        Back to Recipes

      </Link>


      {/* Recipe Header */}

      <div className="row mt-4">

        <div className="col-lg-6 mb-4">

          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="img-fluid rounded-4 shadow recipe-detail-image"
          />

        </div>


        <div className="col-lg-6">

          <span className="badge bg-danger mb-3">
            {recipe.strCategory}
          </span>

          <h1 className="fw-bold mb-3">
            {recipe.strMeal}
          </h1>

          <p className="text-muted">
            Discover how to prepare this delicious meal
            with our easy-to-follow recipe.
          </p>


          <div className="recipe-info mt-4">

            <p>
              <i className="bi bi-egg-fried text-danger me-2"></i>
              Cuisine: {recipe.strArea}
            </p>

            <p>
              <i className="bi bi-clock text-danger me-2"></i>
              Cooking instructions available below
            </p>

          </div>


          <Link
            to="/meal-planner"
            state={{ recipe }}
            className="btn recipe-btn mt-3"
          >

            <i className="bi bi-calendar-plus me-2"></i>

            Go to Meal Planner

          </Link>


          {recipe.strYoutube && (

            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-danger mt-3 ms-2"
            >

              <i className="bi bi-youtube me-2"></i>

              Watch Tutorial

            </a>

          )}

        </div>

      </div>


      {/* Ingredients and Instructions */}

      <div className="row mt-5">

        <div className="col-lg-4 mb-4">

          <div className="detail-box">

            <h3 className="fw-bold mb-4">
              Ingredients
            </h3>

            {getIngredients().map((item, index) => (

              <div className="ingredient-item" key={index}>

                <span>
                  {item.ingredient}
                </span>

                <span className="text-muted">
                  {item.measure}
                </span>

              </div>

            ))}

          </div>

        </div>


        <div className="col-lg-8">

          <div className="detail-box">

            <h3 className="fw-bold mb-4">
              Cooking Instructions
            </h3>

            <p className="instructions">
              {recipe.strInstructions}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RecipeDetails;