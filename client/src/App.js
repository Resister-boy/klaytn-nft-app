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

const DEFAULT_ADDRESS = "0x0000000000000000";

function App() {
  // User
  const [user, setUser] = useState(""); // db user
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS); // wallet address
  const [myBalance, setMyBalance] = useState("0"); // klaytn balance

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "Modal",
    buttonName: "close",
    onConfirm: () => { },
  });

  // componentProps
  const componentProps = {
    user: user, setUser: setUser,
    myAddress: myAddress, setMyAddress: setMyAddress,
    myBalance: myBalance, setMyBalance: setMyBalance,
    showModal: showModal, setShowModal: setShowModal,
    modalProps: modalProps, setModalProps: setModalProps
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home componentProps={componentProps}/>} />
        <Route path="/user" element={<UserPage user={user}/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
