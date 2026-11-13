// Import React hooks for managing state and handling side effects.
import { useState, useEffect } from 'react';

// Import useLocation to access navigation state and Link for page navigation.
import { useLocation, Link } from 'react-router-dom';

// Array containing all seven days of the week.
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

// MealPlanner component allows users to organise recipes into a weekly schedule.
function MealPlanner() {

  // Access the current navigation location and its state.
  const location = useLocation();

  // Retrieve the recipe passed from another page, if available.
  const selectedRecipe = location.state?.recipe;

  // Initialize the meal plan using previously saved data from localStorage.
  // If no saved data exists or an error occurs, return an empty object.
  const [mealPlan, setMealPlan] = useState(() => {

    try {

      // Retrieve the saved weekly meal plan from localStorage.
      const savedPlan = localStorage.getItem('mealPlan');

      // Convert the saved JSON data into a JavaScript object.
      return savedPlan ? JSON.parse(savedPlan) : {};

    } catch (error) {

      // Log an error if the saved meal plan cannot be loaded.
      console.error('Unable to load saved meal plan:', error);

      return {};

    }

  });

  // State to track the currently selected day of the week.
  const [selectedDay, setSelectedDay] = useState('Monday');


  // Save the meal plan to localStorage whenever it changes.
  // This ensures the weekly schedule remains saved after refreshing the page.
  useEffect(() => {

    localStorage.setItem(
      'mealPlan',
      JSON.stringify(mealPlan)
    );

  }, [mealPlan]);


  // Function to add the selected recipe to a specific day.
  const addRecipe = (day) => {

    // Stop the function if no recipe has been selected.
    if (!selectedRecipe) return;

    // Update the meal plan without modifying the previous state directly.
    setMealPlan((previousPlan) => ({

      // Keep all existing days and their planned meals.
      ...previousPlan,

      // Add the selected recipe to the specified day.
      // If the day has no meals, start with an empty array.
      [day]: [
        ...(previousPlan[day] || []),
        selectedRecipe
      ]

    }));

  };


  // Function to remove a recipe from a specific day.
  const removeRecipe = (day, index) => {

    // Update the meal plan by filtering out the selected recipe.
    setMealPlan((previousPlan) => ({

      // Preserve the existing meal plan for other days.
      ...previousPlan,

      // Remove the recipe at the specified array index.
      [day]: previousPlan[day].filter(
        (_, i) => i !== index
      )

    }));

  };


  // Calculate the total number of meals planned across all seven days.
  const totalMeals = Object.values(mealPlan).reduce(
    (total, meals) => total + meals.length,
    0
  );


  // Render the weekly meal planner interface.
  return (

    <div className="container py-5">

      {/* Page Header: Introduces the weekly meal planner. */}
      <div className="planner-header text-center mb-5">

        <h1 className="fw-bold">
          Your Weekly Meal Planner
        </h1>

        <p className="text-muted">
          Organise your meals and make cooking easier.
        </p>

      </div>


      {/* Statistics Section: Displays meal planning information. */}
      <div className="planner-stats mb-5">

        {/* Card displaying the total number of planned meals. */}
        <div className="stat-card">

          <i className="bi bi-calendar-week"></i>

          <h3>{totalMeals}</h3>

          <p>Planned Meals</p>

        </div>

        {/* Card displaying the number of days containing planned meals. */}
        <div className="stat-card">

          <i className="bi bi-calendar-check"></i>

          <h3>
            {days.filter(
              day => mealPlan[day]?.length > 0
            ).length}
          </h3>

          <p>Days Planned</p>

        </div>

      </div>


      {/* Selected Recipe Section: Displays the recipe passed from another page. */}
      {selectedRecipe && (

        <div className="selected-recipe mb-4">

          <div>

            <h5>Selected Recipe</h5>

            {/* Display the name of the selected recipe. */}
            <p className="mb-0">
              {selectedRecipe.strMeal}
            </p>

          </div>

          {/* Add the selected recipe to the currently selected day. */}
          <button
            className="btn recipe-btn"
            onClick={() => addRecipe(selectedDay)}
          >

            <i className="bi bi-plus-circle me-2"></i>

            Add to {selectedDay}

          </button>

        </div>

      )}


      {/* Day Selector: Allows users to choose a day for adding recipes. */}
      <div className="mb-4">

        <h4 className="fw-bold mb-3">
          Select a Day
        </h4>

        <div className="day-selector">

          {/* Generate a button for each day of the week. */}
          {days.map((day) => (

            <button
              key={day}

              // Apply the active class to highlight the selected day.
              className={
                selectedDay === day
                  ? 'day-btn active'
                  : 'day-btn'
              }

              // Update the selected day when a button is clicked.
              onClick={() => setSelectedDay(day)}
            >

              {day}

            </button>

          ))}

        </div>

      </div>


      {/* Weekly Schedule Section: Displays and manages planned meals. */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h4 className="fw-bold mb-0">
          Weekly Schedule
        </h4>

        {/* Display the clear button only when the meal plan contains meals. */}
        {totalMeals > 0 && (
          <button
            className="btn btn-outline-danger"
            onClick={() => {

              // Ask the user to confirm before clearing the entire meal plan.
              const confirmed = window.confirm(
                'Are you sure you want to clear your entire meal plan?'
              );

              // Clear all planned meals if the user confirms.
              if (confirmed) {
                setMealPlan({});
              }
            }}
          >
            <i className="bi bi-trash me-2"></i>
            Clear Meal Plan
          </button>
        )}

      </div>

      {/* Display a separate schedule card for each day of the week. */}
      <div className="row">

        {days.map((day) => (

          <div
            className="col-lg-6 col-md-6 mb-4"
            key={day}
          >

            <div className="day-card">

              {/* Day Card Header: Displays the day name and meal count. */}
              <div className="day-card-header">

                <h5>{day}</h5>

                {/* Display the number of meals planned for this day. */}
                <span>
                  {mealPlan[day]?.length || 0} meals
                </span>

              </div>


              {/* Check whether the selected day contains any planned meals. */}
              {mealPlan[day]?.length > 0 ? (

                // Display all recipes planned for the current day.
                mealPlan[day].map((recipe, index) => (

                  <div
                    className="planned-meal"
                    key={`${recipe.idMeal}-${index}`}
                  >

                    {/* Display the recipe image and alternative text. */}
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                    />

                    <div className="meal-info">

                      {/* Display the recipe name. */}
                      <h6>{recipe.strMeal}</h6>

                      {/* Navigate to the recipe details page. */}
                      <Link
                        to={`/recipe/${recipe.idMeal}`}
                      >
                        View Recipe
                      </Link>

                    </div>

                    {/* Remove the selected recipe from the current day. */}
                    <button
                      className="remove-btn"
                      onClick={() => removeRecipe(day, index)}

                      // Provide an accessible description for screen readers.
                      aria-label={`Remove ${recipe.strMeal} from ${day}`}
                    >

                      <i className="bi bi-trash"></i>

                    </button>

                  </div>

                ))

              ) : (

                // Display a message when no meals have been planned for the day.
                <p className="empty-day">
                  <i className="bi bi-calendar-plus"></i>
                  <br />
                  No meals planned yet.
                </p>

              )}

            </div>

          </div>

        ))}

      </div>


      {/* Empty Plan Message: Displayed when no meals have been added. */}
      {totalMeals === 0 && (

        <div className="text-center mt-4">

          <p className="text-muted">
            Your weekly meal plan is empty.
          </p>

          {/* Provide a link to return to the homepage and explore recipes. */}
          <Link to="/" className="btn recipe-btn">
            Explore Recipes
          </Link>

        </div>

      )}

    </div>

  );

}

// Export the MealPlanner component so it can be used in application routing.
export default MealPlanner;