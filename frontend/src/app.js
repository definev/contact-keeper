import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactsState from './context/contacts/ContactsState';

const App = () => {
  return (
    <ContactsState>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </ContactsState>
  );
};

export default App;
