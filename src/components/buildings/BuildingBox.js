import React from 'react';
import { Link } from 'react-router-dom';

function BuildingBox({ building }) {
  return(
    <Link to={`building/${building._id}`}>
      <div className="building-box columns is-mobile">
        <div className="column is-one-quarter">
          <figure className="image is-1by1">
            <img src={building.icon}/>
          </figure>
        </div>
        <div className="column is-three-quarters">
          <p className="is-size-6-mobile">{building.name}</p>
          <p className="is-size-7-mobile">{building.architect}</p>
        </div>
      </div>
    </Link>
  );
}

export default BuildingBox;
