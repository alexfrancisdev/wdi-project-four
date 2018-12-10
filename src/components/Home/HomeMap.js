import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { redMarker, userMarker } from '../../lib/mapIcons';

const HomeMap = ({ userPosition, buildings }) => {
  return (
    <div id='map'>
      <Map center={userPosition} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          // url='https://api.mapbox.com/styles/v1/sophiabarclay/cjphi90qw33w22spcccsrbfzd.html?fresh=true&title=true&access_token=pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanA5c3V5aGUwMnI3M3JwN2NxY3V6aThqIn0.oMlcrlmaCpK_7H8D0jLOng#10.0/42.362400/-71.020000/0'
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor'
        />
        {userPosition && <Marker icon={ userMarker } position={userPosition}>
          <Popup>
        Your location!
          </Popup>
        </Marker>}
        {buildings && buildings.map(building =>
          <Marker icon={ redMarker } key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/buildings/${building._id}`}>
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
