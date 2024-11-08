// Sanghyun Jun
// Sanghyun.Jun.1@stonybrook.edu

import React from "react";
import "./FacilityList.css"; 
import Calendar from '@mui/icons-material/CalendarToday'; 
import People from '@mui/icons-material/People';
import Location from '@mui/icons-material/LocationOn';
import Available from '@mui/icons-material/Accessibility';

const FacilityList = ({ facilities }) => {
  return (
    <div className="facility-list">
      {facilities.map((facility, index) => (
        <div key={index} className="facility-container">
          {facility.isODD ? (
            <div className="blank-block"></div>
          ) : (
            <>
              <img
                src={facility.image_url} 
                alt={facility.name}
                className="facility-image"
              />
              <div className="facility-details">
                <h2>{facility.name}</h2>
                <p>{facility.description}</p>
                <p><Calendar /> {facility.available_days}</p> 
                <p><People /> {facility.min_capacity} - {facility.max_capacity}</p> 
                <p><Location /> {facility.location}</p>
                <p><Available /> {facility.only_for_suny ? "SUNY only" : "Available to all"}</p> {/* SUNY 접근 제한 여부 */}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FacilityList;
