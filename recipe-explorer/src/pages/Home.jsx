// Import React hooks for managing component state and side effects.
import { useEffect, useState } from 'react';

// Import the RecipeCard component to display individual recipes.
import RecipeCard from '../components/RecipeCard';

// Import API functions for searching recipes and retrieving categories.
import {
  searchRecipes,
  getRecipesByCategory,
  getCategories
} from '../services/recipeApi.js';

// Home component displays recipe search, categories, and recipe collections.
function Home() {

  // State to store the list of recipes retrieved from the API.
  const [recipes, setRecipes] = useState([]);

  // State to store available recipe categories.
  const [categories, setCategories] = useState([]);

  // State to store the user's search input.
  const [search, setSearch] = useState('');

  // State to track whether recipes are currently being loaded.
  const [loading, setLoading] = useState(false);

  // State to store error or information messages.
  const [error, setError] = useState('');

  // Load the initial recipes and categories when the component first renders.
  useEffect(() => {
    loadRecipes('chicken');
    loadCategories();
  }, []);

  // Function to fetch recipes based on the provided search query.
  const loadRecipes = async (query) => {

    // Display the loading indicator and clear previous errors.
    setLoading(true);
    setError('');

    try {

      // Fetch recipes from the API using the search query.
      const data = await searchRecipes(query);

      // Update the recipes state with the retrieved data.
      setRecipes(data);

      // Display a message if no recipes match the search query.
      if (data.length === 0) {
        setError('No recipes found. Try another search!');
      }

    } catch (err) {

      // Display an error message if the API request fails.
      setError('Unable to load recipes. Please try again.');

    } finally {

      // Stop the loading indicator after the request completes.
      setLoading(false);

    }
  };

  // Function to fetch all available recipe categories from the API.
  const loadCategories = async () => {

    try {

      // Retrieve category data from the API.
      const data = await getCategories();

      // Store the retrieved categories in state.
      setCategories(data);

    } catch (err) {

      // Log an error if categories cannot be loaded.
      console.error('Unable to load categories');

    }
  };

  // Handle recipe search form submission.
  const handleSearch = (e) => {

    // Prevent the browser from refreshing the page when submitting the form.
    e.preventDefault();

    // Search for recipes only if the input is not empty.
    if (search.trim()) {
      loadRecipes(search.trim());
    }

  };

  // Function to fetch recipes belonging to the selected category.
  const handleCategory = async (category) => {

    // Display the loading indicator and clear previous errors.
    setLoading(true);
    setError('');

    try {

      // Fetch recipes based on the selected category.
      const data = await getRecipesByCategory(category);

      // Update the recipes state with the category results.
      setRecipes(data);

      // Display a message if the selected category has no recipes.
      if (data.length === 0) {
        setError('No recipes available in this category.');
      }

    } catch (err) {

      // Display an error message if the category request fails.
      setError('Unable to load category recipes.');

    } finally {

      // Stop the loading indicator after the request completes.
      setLoading(false);

    }
  };

  // Render the Home page interface.
  return (

    <div>

      {/* Hero section introducing the Recipe Explorer application. */}
      <section className="hero-section text-center">

        <div className="container">

          {/* Main heading displayed at the top of the homepage. */}
          <h1>
            Discover Your Next
            <span> Favourite Meal</span>
          </h1>

          {/* Short description encouraging users to explore recipes. */}
          <p>
            Explore delicious recipes and find inspiration
            for your next cooking adventure.
          </p>

          {/* Search form allowing users to find recipes by name. */}
          <form
            onSubmit={handleSearch}
            className="search-form mx-auto"
          >

            {/* Input field controlled by the search state. */}
            <input
              type="text"
              className="form-control"
              placeholder="Search for recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Button to submit the recipe search form. */}
            <button type="submit" className="search-btn">
              <i className="bi bi-search"></i>
              Search
            </button>

          </form>

        </div>

      </section>

      {/* Section displaying available recipe categories. */}
      <section className="container py-5">

        <h2 className="section-title">
          Explore Categories
        </h2>

        {/* Display each category as a clickable button. */}
        <div className="category-container">

          {categories.map((category) => (

            <button
              key={category.idCategory}
              className="category-btn"
              onClick={() => handleCategory(category.strCategory)}
            >
              {category.strCategory}
            </button>

          ))}

        </div>

      </section>

      {/* Section displaying the recipes retrieved from the API. */}
      <section className="container pb-5">

        <h2 className="section-title">
          Delicious Recipes
        </h2>

        {/* Display a loading spinner while recipes are being fetched. */}
        {loading && (

          <div className="text-center py-5">
            <div className="spinner-border text-danger"></div>
            <p className="mt-3">Finding delicious recipes...</p>
          </div>

        )}

        {/* Display a warning message if an error occurs or no recipes are found. */}
        {error && !loading && (

          <div className="alert alert-warning">
            {error}
          </div>

        )}

        {/* Display recipe cards when loading is complete and no errors exist. */}
        {!loading && !error && (

          <div className="row">

            {/* Loop through the recipes array and create a RecipeCard for each recipe. */}
            {recipes.map((recipe) => (

              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
              />

            ))}

          </div>

        )}

      </section>

    </div>

  );

}

// Export the Home component so it can be used in the application routing.
export default Home;