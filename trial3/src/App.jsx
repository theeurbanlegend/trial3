import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import AddPost from './components/AddPost';

export default function App() {
  return (
    <Router>
      <div className='home'>
        <Routes>
          <Route path='/' exact element={<Main/>} />
          <Route path='/post' element={<AddPost/>} />
        </Routes>
      </div>
    </Router>
  );
}
