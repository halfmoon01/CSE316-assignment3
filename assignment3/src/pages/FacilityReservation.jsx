//Sanghyun Jun
//Sanghyun.Jun.1@stonybrook.edu

import React, { useState } from "react";
import Calendar from '@mui/icons-material/CalendarToday'; 
import People from '@mui/icons-material/People';
import Location from '@mui/icons-material/LocationOn';
import Available from '@mui/icons-material/Accessibility';
import "./FacilityReservation.css";

function FacilityReservation({ facilities }) { // Accept facilities from "App.jsx"
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]); 
  const [formData, setFormData] = useState({
    date: '',
    people: '',
    affiliation: 'SUNY Korea',
    purpose: ''
  });

  const FacilitySelect = (event) => {
    const selectedName = event.target.value;
    const facility = facilities.find(f => f.name === selectedName);
    setSelectedFacility(facility);
  };

  const handleFormChange = (f) => {
    const { name, value } = f.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // save Database..
  };

  return (
    <div className="reservation-container">
      <select onChange={FacilitySelect} className="select">
        {facilities.map((facility, index) => (
          <option key={index} value={facility.name}>
            {facility.name}
          </option>
        ))}
      </select>
      <div className="selected-container">
        <img src={selectedFacility.image_url} alt={selectedFacility.name} className="selected-image" />
        <div className="selected-details">
          <h2>{selectedFacility.name}</h2>
          <p>{selectedFacility.description}</p>
          <p><Calendar /> Available Days: {selectedFacility.available_days}</p>
          <p><People /> Capacity: {selectedFacility.min_capacity} - {selectedFacility.max_capacity}</p>
          <p><Location /> Location: {selectedFacility.location}</p>
          <p><Available /> {selectedFacility.only_for_suny ? 'Only for SUNY Korea' : 'Available to All'}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date to be Used:</label><br />
          <input 
            type="date" 
            className="text" 
            name="date" 
            value={formData.date} 
            onChange={handleFormChange} 
          />
        </div>
        <div>
          <label>Number of People:</label><br />
          <input 
            type="number" 
            className="text" 
            name="people" 
            value={formData.people} 
            onChange={handleFormChange} 
          />
        </div>
        <div className="radio">
          <input 
            type="radio" 
            name="affiliation" 
            value="SUNY Korea" 
            checked={formData.affiliation === 'SUNY Korea'} 
            onChange={handleFormChange} 
          /> SUNY Korea
          <input 
            type="radio" 
            name="affiliation" 
            value="Non-SUNY Korea"
            checked={formData.affiliation === 'Non-SUNY Korea'} 
            onChange={handleFormChange} 
          /> Non-SUNY Korea
        </div>
        <div>
          <label>Purpose of Use:</label><br />
          <textarea 
            rows="4" 
            className="textarea" 
            name="purpose" 
            value={formData.purpose} 
            onChange={handleFormChange} 
          />
        </div>
        <button type="submit" className="reservation-submit">Submit</button>
      </form>
    </div>
  );
}

export default FacilityReservation;

