import React from 'react';

function SearchBox({ filteredBuilding }) {
  return(
    <div className="filteredBuilding-box columns is-mobile">
      <div className="column is-one-quarter">
        <figure className="image is-1by1">
          <img src={filteredBuilding.icon}/>
        </figure>
      </div>
      <div className="column is-three-quarters">
        <p className="is-size-6-mobile">{filteredBuilding.name}</p>
        <p className="is-size-6-mobile">{filteredBuilding.architect}</p>
      </div>
    </div>
  );
}

export default SearchBox;
