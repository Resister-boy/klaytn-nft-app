import React from 'react';
import Home from './pages/home/Home';
import UserPage from './pages/myProfile/MyProfile';
import NotFound from './pages/notFound/NotFound';
import Market from './pages/market/Market';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PostDetail from './components/postDetail/PostDetail';
import Posting from './pages/posting/Posting';
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
        <Route path="/myprofile" element={user ? <UserPage /> : <Navigate to="/" />} />
        <Route path="/market" element={user ? <Market /> : <Navigate to="/" />} />
        <Route path="/posting" element={user ? <Posting /> : <Navigate to="/" />} />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
