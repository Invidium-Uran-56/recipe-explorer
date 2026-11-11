const API_URL = 'https://www.themealdb.com/api/json/v1/1';

// Search recipes by name
export const searchRecipes = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/search.php?s=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();

    return data.meals || [];

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get recipes by category
export const getRecipesByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/filter.php?c=${encodeURIComponent(category)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch category recipes');
    }

    const data = await response.json();

    return data.meals || [];

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get all available categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories.php`);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();

    return data.categories || [];

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get recipe details using recipe ID
export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}/lookup.php?i=${id}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }

    const data = await response.json();

    return data.meals ? data.meals[0] : null;

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};