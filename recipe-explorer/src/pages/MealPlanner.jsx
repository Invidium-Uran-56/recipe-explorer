import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

function MealPlanner() {

  const location = useLocation();

  const selectedRecipe = location.state?.recipe;

  // Load saved meal plan
const [mealPlan, setMealPlan] = useState(() => {

  try {

    const savedPlan = localStorage.getItem('mealPlan');

    return savedPlan ? JSON.parse(savedPlan) : {};

  } catch (error) {

    console.error('Unable to load saved meal plan:', error);

    return {};

  }

});

  const [selectedDay, setSelectedDay] = useState('Monday');


  // Save meal plan whenever it changes
  useEffect(() => {

    localStorage.setItem(
      'mealPlan',
      JSON.stringify(mealPlan)
    );

  }, [mealPlan]);


  // Add recipe to selected day
  const addRecipe = (day) => {

    if (!selectedRecipe) return;

    setMealPlan((previousPlan) => ({

      ...previousPlan,

      [day]: [
        ...(previousPlan[day] || []),
        selectedRecipe
      ]

    }));

  };


  // Remove recipe from a day
  const removeRecipe = (day, index) => {

    setMealPlan((previousPlan) => ({

      ...previousPlan,

      [day]: previousPlan[day].filter(
        (_, i) => i !== index
      )

    }));

  };


  // Count all planned meals
  const totalMeals = Object.values(mealPlan).reduce(
    (total, meals) => total + meals.length,
    0
  );


  return (

    <div className="container py-5">

      {/* Page Header */}

      <div className="planner-header text-center mb-5">

        <h1 className="fw-bold">
          Your Weekly Meal Planner
        </h1>

        <p className="text-muted">
          Organise your meals and make cooking easier.
        </p>

      </div>


      {/* Statistics */}

      <div className="planner-stats mb-5">

        <div className="stat-card">

          <i className="bi bi-calendar-week"></i>

          <h3>{totalMeals}</h3>

          <p>Planned Meals</p>

        </div>

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


      {/* Selected Recipe */}

      {selectedRecipe && (

        <div className="selected-recipe mb-4">

          <div>

            <h5>Selected Recipe</h5>

            <p className="mb-0">
              {selectedRecipe.strMeal}
            </p>

          </div>

          <button
            className="btn recipe-btn"
            onClick={() => addRecipe(selectedDay)}
          >

            <i className="bi bi-plus-circle me-2"></i>

            Add to {selectedDay}

          </button>

        </div>

      )}


      {/* Day Selector */}

      <div className="mb-4">

        <h4 className="fw-bold mb-3">
          Select a Day
        </h4>

        <div className="day-selector">

          {days.map((day) => (

            <button
              key={day}
              className={
                selectedDay === day
                  ? 'day-btn active'
                  : 'day-btn'
              }
              onClick={() => setSelectedDay(day)}
            >

              {day}

            </button>

          ))}

        </div>

      </div>


      {/* Weekly Schedule */}

<div className="d-flex justify-content-between align-items-center mb-4">

  <h4 className="fw-bold mb-0">
    Weekly Schedule
  </h4>

  {totalMeals > 0 && (
    <button
      className="btn btn-outline-danger"
      onClick={() => {
        const confirmed = window.confirm(
          'Are you sure you want to clear your entire meal plan?'
        );

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

      <div className="row">

        {days.map((day) => (

          <div
            className="col-lg-6 col-md-6 mb-4"
            key={day}
          >

            <div className="day-card">

              <div className="day-card-header">

                <h5>{day}</h5>

                <span>
                  {mealPlan[day]?.length || 0} meals
                </span>

              </div>


              {mealPlan[day]?.length > 0 ? (

                mealPlan[day].map((recipe, index) => (

                  <div
                    className="planned-meal"
                    key={`${recipe.idMeal}-${index}`}
                  >

                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                    />

                    <div className="meal-info">

                      <h6>{recipe.strMeal}</h6>

                      <Link
                        to={`/recipe/${recipe.idMeal}`}
                      >
                        View Recipe
                      </Link>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeRecipe(day, index)}
                      aria-label={`Remove ${recipe.strMeal} from ${day}`}
                    >

                      <i className="bi bi-trash"></i>

                    </button>

                  </div>

                ))

              ) : (

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


      {/* Empty Plan Message */}

      {totalMeals === 0 && (

        <div className="text-center mt-4">

          <p className="text-muted">
            Your weekly meal plan is empty.
          </p>

          <Link to="/" className="btn recipe-btn">
            Explore Recipes
          </Link>

        </div>

      )}

    </div>

  );

}

export default MealPlanner;