import React from 'react';
import { Link } from 'react-router-dom';

function TourBox({ filteredTour }) {
  return(
    <Link to={`tours/${filteredTour._id}`}>
      <div className="filteredBuilding-box columns is-mobile">
        <div className="column is-one-quarter">
          <figure className="image is-1by1">
            <img src={filteredTour.buildings[0].icon}/>
          </figure>

        </div>
        <div className="column is-three-quarters">
          <p className="is-size-5-mobile">{filteredTour.name}</p>
          <p className="is-size-6-mobile">{filteredTour.createdBy.username}</p>
        </div>
      </div>
    </Link>
  );
}

export default TourBox;
