import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';

const HomeMap = ({ userPosition, buildings }) => {
  console.log(buildings);
  return (
    <div id='map'>
      <Map center={userPosition || buildings[0].location} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {userPosition && <Marker position={userPosition}>
          <Popup>
            You!
          </Popup>
        </Marker>}
        {buildings && buildings.map(building =>
          <Marker key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/buildings/${building._id}`}>
                {building.name}
              </Link>
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default HomeMap;
