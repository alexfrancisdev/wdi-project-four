import React from 'react';

function TourBox({ filteredTour }) {
  return(
    <div className="filteredBuilding-box columns is-mobile">
      <div className="column is-one-quarter">
        <figure className="image is-1by1">
          <img src={filteredTour.buildings[0].icon}/>
        </figure>

      </div>
      <div className="column is-three-quarters">
        <p className="is-size-6-mobile">{filteredTour.name}</p>
      </div>
    </div>
  );
}

export default TourBox;
