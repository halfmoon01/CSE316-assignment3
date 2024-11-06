//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu

import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import FacilityList from './pages/FacilityList';

function App() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
      // Fetch facilities data from the backend once on app load
      const getFacilities = async () => {
          try {
              const response = await fetch('http://localhost:5001/api/facilities');
              const data = await response.json();
              setFacilities(data); // Store fetched data using state
          } catch (error) {
              console.error('Failure', error);
          }
      };
      getFacilities();
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/facility-list" element={<FacilityList facilities={facilities} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;