import React from 'react';
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
  const DEFAULT_ADDRESS = "0x0000000000000000";
  // User
  const [user, setUser] = useState(""); // db user
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS); // wallet address
  const [myBalance, setMyBalance] = useState("0"); // klaytn balance

  const userProps = {
    user: user, setUser: setUser,
    myAddress: myAddress, setMyAddress: setMyAddress,
    myBalance: myBalance, setMyBalance: setMyBalance
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={ user ? <UserPage userProps={userProps}/> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
