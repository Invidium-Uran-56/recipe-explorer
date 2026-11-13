// Import React hooks for managing component state and side effects.
import { useEffect, useState } from 'react';

// Import useParams to retrieve the recipe ID from the URL
// and Link to navigate between application pages.
import { useParams, Link } from 'react-router-dom';

// Import the API function used to retrieve recipe details.
import { getRecipeDetails } from '../services/recipeApi.js';

// RecipeDetails component displays complete information about a selected recipe.
function RecipeDetails() {

  // Retrieve the recipe ID from the URL parameters.
  const { id } = useParams();

  // State to store the details of the selected recipe.
  const [recipe, setRecipe] = useState(null);

  // State to track whether recipe details are being loaded.
  const [loading, setLoading] = useState(true);

  // State to store error messages if the recipe cannot be retrieved.
  const [error, setError] = useState('');

  // Fetch the selected recipe details when the component loads
  // or when the recipe ID in the URL changes.
  useEffect(() => {

    // Async function to retrieve recipe information from the API.
    const loadRecipe = async () => {

      // Display the loading indicator and clear previous errors.
      setLoading(true);
      setError('');

      try {

        // Fetch recipe details using the ID obtained from the URL.
        const data = await getRecipeDetails(id);

        // Check whether the requested recipe exists.
        if (!data) {
          setError('Recipe not found.');
        } else {

          // Store the retrieved recipe details in state.
          setRecipe(data);
        }

      } catch (err) {

        // Display an error message if the API request fails.
        setError('Unable to load recipe details.');

      } finally {

        // Stop the loading indicator after the request completes.
        setLoading(false);

      }

    };

    // Execute the function to load recipe details.
    loadRecipe();

  }, [id]);


  // Function to extract ingredient names and their measurements.
  const getIngredients = () => {

    // Return an empty array if recipe information is unavailable.
    if (!recipe) return [];

    // Create an empty array to store the extracted ingredients.
    const ingredients = [];

    // Loop through the 20 possible ingredient fields provided by the API.
    for (let i = 1; i <= 20; i++) {

      // Retrieve the ingredient name and its corresponding measurement.
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      // Check that the ingredient exists and is not an empty string.
      if (ingredient && ingredient.trim()) {

        // Add the ingredient name and measurement to the array.
        ingredients.push({
          ingredient,
          measure
        });

      }

    }

    // Return the completed list of ingredients.
    return ingredients;

  };


  // Display a loading screen while recipe details are being fetched.
  if (loading) {

    return (

      <div className="text-center py-5">

        {/* Bootstrap loading spinner. */}
        <div className="spinner-border text-danger"></div>

        <p className="mt-3">
          Loading recipe...
        </p>

      </div>

    );

  }


  // Display an error screen if the recipe cannot be retrieved.
  if (error) {

    return (

      <div className="container py-5">

        {/* Display the error message inside a warning alert. */}
        <div className="alert alert-warning">
          {error}
        </div>

        {/* Provide a button to return to the recipe collection. */}
        <Link to="/" className="btn btn-danger">
          Back to Recipes
        </Link>

      </div>

    );

  }


  // Render the complete recipe details page.
  return (

    <div className="container py-5">

      {/* Back Button: Allows users to return to the homepage. */}
      <Link to="/" className="back-link">

        <i className="bi bi-arrow-left me-2"></i>

        Back to Recipes

      </Link>


      {/* Recipe Header: Displays the recipe image and basic information. */}
      <div className="row mt-4">

        {/* Display the selected recipe image. */}
        <div className="col-lg-6 mb-4">

          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="img-fluid rounded-4 shadow recipe-detail-image"
          />

        </div>


        {/* Display the recipe name, category, and additional information. */}
        <div className="col-lg-6">

          {/* Display the recipe category as a badge. */}
          <span className="badge bg-danger mb-3">
            {recipe.strCategory}
          </span>

          {/* Display the recipe title. */}
          <h1 className="fw-bold mb-3">
            {recipe.strMeal}
          </h1>

          {/* Provide a short description of the selected recipe. */}
          <p className="text-muted">
            Discover how to prepare this delicious meal
            with our easy-to-follow recipe.
          </p>


          {/* Display additional recipe information such as cuisine. */}
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


          {/* Navigate to the Meal Planner and pass the selected recipe
              through React Router navigation state. */}
          <Link
            to="/meal-planner"
            state={{ recipe }}
            className="btn recipe-btn mt-3"
          >

            <i className="bi bi-calendar-plus me-2"></i>

            Go to Meal Planner

          </Link>


          {/* Display the tutorial button only if a YouTube link is available. */}
          {recipe.strYoutube && (

            <a
              href={recipe.strYoutube}
              target="_blank"

              // Prevent the new tab from accessing the original window.
              rel="noreferrer"

              className="btn btn-outline-danger mt-3 ms-2"
            >

              <i className="bi bi-youtube me-2"></i>

              Watch Tutorial

            </a>

          )}

        </div>

      </div>


      {/* Ingredients and Instructions Section:
          Displays the ingredients list and cooking instructions. */}
      <div className="row mt-5">

        {/* Ingredients Section: Displays ingredient names and measurements. */}
        <div className="col-lg-4 mb-4">

          <div className="detail-box">

            <h3 className="fw-bold mb-4">
              Ingredients
            </h3>

            {/* Loop through the extracted ingredients and display each one. */}
            {getIngredients().map((item, index) => (

              <div className="ingredient-item" key={index}>

                {/* Display the ingredient name. */}
                <span>
                  {item.ingredient}
                </span>

                {/* Display the corresponding ingredient measurement. */}
                <span className="text-muted">
                  {item.measure}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* Cooking Instructions Section: Displays the preparation steps. */}
        <div className="col-lg-8">

          <div className="detail-box">

            <h3 className="fw-bold mb-4">
              Cooking Instructions
            </h3>

            {/* Display the complete cooking instructions retrieved from the API. */}
            <p className="instructions">
              {recipe.strInstructions}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

// Export the RecipeDetails component so it can be used in application routing.
export default RecipeDetails;