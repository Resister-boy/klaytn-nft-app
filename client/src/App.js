import React from 'react';
import Home from './pages/home/Home';
import UserPage from './pages/user/UserPage';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PostDetail from './components/postDetail/PostDetail';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={ <PostDetail /> } />
        {/* <Route path="/user" element={user ? <UserPage /> : <Navigate to="/" />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
