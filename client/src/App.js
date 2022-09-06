import React from 'react';
import Market from "./pages/market/Market";
import Home from './pages/home/Home';
import UserPage from './pages/user/UserPage';
import { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Market />} /> */}
        <Route path="/user" element={<UserPage user={user}/> } />
        <Route path="/market" element={<Market user={user} setUser={setUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
