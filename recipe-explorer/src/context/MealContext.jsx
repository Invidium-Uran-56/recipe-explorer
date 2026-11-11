import { createContext, useContext, useEffect, useState } from "react";

const MealContext = createContext();

export function MealProvider({ children }) {

const [meals, setMeals] = useState(() => {
try {
const savedMeals = localStorage.getItem("myMeals");
return savedMeals ? JSON.parse(savedMeals) : [];
} catch {
return [];
}
});

// Save meals whenever the list changes
useEffect(() => {
localStorage.setItem("myMeals", JSON.stringify(meals));
}, [meals]);

// Add a recipe
const addMeal = (recipe) => {

```
const alreadyExists = meals.some(
  (meal) => meal.idMeal === recipe.idMeal
);

if (alreadyExists) {
  return false;
}

setMeals((previousMeals) => [
  ...previousMeals,
  recipe
]);

return true;
```

};

// Remove a recipe
const removeMeal = (id) => {

```
setMeals((previousMeals) =>
  previousMeals.filter(
    (meal) => meal.idMeal !== id
  )
);
```

};

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

// Custom hook for accessing meal context
export function useMeals() {
const context = useContext(MealContext);

if (!context) {
throw new Error(
"useMeals must be used inside MealProvider"
);
}

return context;
}
