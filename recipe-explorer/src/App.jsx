import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import MealPlanner from './pages/MealPlanner';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <>
      <Navbar />

<Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/recipe/:id"
    element={<RecipeDetails />}
  />
  <Route
    path="/meal-planner"
    element={<MealPlanner />}
  />
  <Route
    path="*"
    element={<NotFound />}
  />
</Routes>

      <Footer />
    </>
  );
}

export default App;