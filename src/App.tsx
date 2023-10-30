import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Meals from './page/Meals';
import Profile from './page/Profile';
import Drinks from './page/Drinks';
import Layout from './components/Layout';
import DoneRecipes from './page/Done-Recipes';
import FavoriteRecipes from './page/Favorite-Recipes';
import RecipeDetails from './page/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="*" element={ <h1>Not Found</h1> } />
      </Route>
      {/* <Route path="/meals/:id" element={ <h1>Meal Details</h1> } /> */}
    </Routes>
  );
}

export default App;
