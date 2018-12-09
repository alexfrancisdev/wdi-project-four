import React from 'react';

function addBuilding(event){
  console.log('Pick me, pick me!');
  console.log(event);
}

function SearchBox({ filteredBuilding }) {
  return(
    <div onClick={addBuilding} className="filteredBuilding-box columns is-mobile">
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
  );
}

export default SearchBox;
