import { useEffect, useState } from 'react';

import RecipeCard from '../components/RecipeCard';

import {
  searchRecipes,
  getRecipesByCategory,
  getCategories
} from '../services/recipeApi.js';

function Home() {

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load initial recipes and categories
  useEffect(() => {
    loadRecipes('chicken');
    loadCategories();
  }, []);

  // Fetch recipes
  const loadRecipes = async (query) => {

    setLoading(true);
    setError('');

    try {

      const data = await searchRecipes(query);

      setRecipes(data);

      if (data.length === 0) {
        setError('No recipes found. Try another search!');
      }

    } catch (err) {

      setError('Unable to load recipes. Please try again.');

    } finally {

      setLoading(false);

    }
  };

  // Fetch categories
  const loadCategories = async () => {

    try {

      const data = await getCategories();

      setCategories(data);

    } catch (err) {

      console.error('Unable to load categories');

    }
  };

  // Search form
  const handleSearch = (e) => {

    e.preventDefault();

    if (search.trim()) {
      loadRecipes(search.trim());
    }

  };

  // Filter by category
  const handleCategory = async (category) => {

    setLoading(true);
    setError('');

    try {

      const data = await getRecipesByCategory(category);

      setRecipes(data);

      if (data.length === 0) {
        setError('No recipes available in this category.');
      }

    } catch (err) {

      setError('Unable to load category recipes.');

    } finally {

      setLoading(false);

    }
  };

  return (

    <div>

      {/* Hero Section */}

      <section className="hero-section text-center">

        <div className="container">

          <h1>
            Discover Your Next
            <span> Favourite Meal</span>
          </h1>

          <p>
            Explore delicious recipes and find inspiration
            for your next cooking adventure.
          </p>

          {/* Search Bar */}

          <form
            onSubmit={handleSearch}
            className="search-form mx-auto"
          >

            <input
              type="text"
              className="form-control"
              placeholder="Search for recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit" className="search-btn">
              <i className="bi bi-search"></i>
              Search
            </button>

          </form>

        </div>

      </section>


      {/* Categories */}

      <section className="container py-5">

        <h2 className="section-title">
          Explore Categories
        </h2>

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


      {/* Recipe Collection */}

      <section className="container pb-5">

        <h2 className="section-title">
          Delicious Recipes
        </h2>

        {loading && (

          <div className="text-center py-5">
            <div className="spinner-border text-danger"></div>
            <p className="mt-3">Finding delicious recipes...</p>
          </div>

        )}

        {error && !loading && (

          <div className="alert alert-warning">
            {error}
          </div>

        )}

        {!loading && !error && (

          <div className="row">

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

export default Home;