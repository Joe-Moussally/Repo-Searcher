import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import FavoritesScreen from './pages/FavoritesScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />}/>
        <Route path='/favorites' element={<FavoritesScreen />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
