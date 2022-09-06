import React, { useContext } from 'react';
import Market from "./pages/market/Market";
import Home from './pages/home/Home';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Navigate to="/market" /> } />
        <Route path="/home" element={<Home /> } />
        <Route path="/market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
