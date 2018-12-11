import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { redMarkerNew, userMarker } from '../../lib/mapIcons';



const HomeMap = ({ userPosition, buildings }) => {
  console.log('BUILDINGS', buildings);
  return (
    <div id='map'>
      <Map center={userPosition} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw'
        />
        {userPosition && <Marker icon={ userMarker } position={userPosition}>
          <Popup>
        Your location!
          </Popup>
        </Marker>}
        {buildings && buildings.map(building =>
          <Marker icon={ redMarkerNew } key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/explore/${building._id}`}>
                <h2>{building.name}</h2>
                <img src={building.icon}/>
                <p>test</p>
              </Link>
            </Popup>
          </Marker>
        )}



      </Map>
    </div>
  );
};

export default HomeMap;
