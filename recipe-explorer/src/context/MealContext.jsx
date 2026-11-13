// Import React functions for creating context, accessing context,
// managing state, and handling side effects.
import { createContext, useContext, useEffect, useState } from "react";

// Create a context to share meal data across different components.
const MealContext = createContext();

// MealProvider component provides meal-related data and functions
// to all child components.
export function MealProvider({ children }) {

  // Initialize the meals state using data saved in localStorage.
  // If no saved data exists or an error occurs, use an empty array.
  const [meals, setMeals] = useState(() => {
    try {
      const savedMeals = localStorage.getItem("myMeals");
      return savedMeals ? JSON.parse(savedMeals) : [];
    } catch {
      return [];
    }
  });

  // Save the updated meals list to localStorage whenever meals changes.
  // This allows the selected recipes to remain saved after refreshing the page.
  useEffect(() => {
    localStorage.setItem("myMeals", JSON.stringify(meals));
  }, [meals]);

  // Function to add a recipe to the meal list.
  const addMeal = (recipe) => {

    // Check whether the recipe already exists in the meal list
    // by comparing its unique meal ID.
    const alreadyExists = meals.some(
      (meal) => meal.idMeal === recipe.idMeal
    );

    // Prevent duplicate recipes from being added.
    if (alreadyExists) {
      return false;
    }

    // Add the new recipe to the existing meals list.
    setMeals((previousMeals) => [
      ...previousMeals,
      recipe
    ]);

    // Return true to indicate that the recipe was added successfully.
    return true;
  };

  // Function to remove a recipe from the meal list using its ID.
  const removeMeal = (id) => {

    // Create a new array containing only recipes
    // whose IDs do not match the selected recipe ID.
    setMeals((previousMeals) =>
      previousMeals.filter(
        (meal) => meal.idMeal !== id
      )
    );
  };

  // Provide the meals state and meal management functions
  // to all components wrapped inside MealProvider.
  return (
    <MealContext.Provider
      value={{
        meals,
        addMeal,
        removeMeal
      }}
    >
      {children}
    </MealContext.Provider>
  );
}

// Custom hook for accessing the MealContext data and functions.
export function useMeals() {
  const context = useContext(MealContext);

  // Ensure that the hook is only used inside a MealProvider.
  // Display an error if it is used outside the provider.
  if (!context) {
    throw new Error(
      "useMeals must be used inside MealProvider"
    );
  }

  // Return the context so components can access meals,
  // addMeal, and removeMeal.
  return context;
}
