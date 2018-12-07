import React from 'react';
import { Link } from 'react-router-dom';

function BuildingBox({ filteredBuilding }) {
  return(
    <Link to={`explore/${filteredBuilding._id}`}>
      <div className="filteredBuilding-box columns is-mobile">
        <div className="column is-one-quarter">
          <figure className="image is-1by1">
            <img src={filteredBuilding.icon}/>
          </figure>
        </div>
        <div className="column is-three-quarters">
          <p className="is-size-6-mobile">{filteredBuilding.name}</p>
          <p className="is-size-7-mobile">{filteredBuilding.architect}</p>
        </div>
      </div>
    </Link>
  );
}

export default BuildingBox;
