import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import Coin from './Pages/Coin';

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/coin/:id" element={<Coin />} /> {/* Dynamic route for coin details */}
      </Routes>
      </>
  );
};

export default App;