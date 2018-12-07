import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';


const HomeMap = ({ userPosition, buildings }) => {
  return (
    <div id='map'>
      <Map center={userPosition} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {userPosition && <Marker position={userPosition}>
          <Popup>
        Your location!
          </Popup>
        </Marker>}
        {buildings && buildings.map(building =>
          <Marker key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/buildings/${building._id}`}>
                <h2>{building.name}</h2>
                <img src={building.icon}/>
              </Link>
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default HomeMap;