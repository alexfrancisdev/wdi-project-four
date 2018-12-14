import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { redMarker, yellowMarker, blueMarker, greenMarker, userMarker } from '../../lib/mapIcons';

const HomeMap = ({ userPosition, allBuildings, myBuildings, likedBuildings, followedBuildings }) => {
  return (
    <div id='map'>
      <Map center={userPosition} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw'/>
        {userPosition && <Marker icon={ userMarker } position={userPosition}>
          <Popup>
        Your location!
          </Popup>
        </Marker>}
        {myBuildings && myBuildings.map(building =>
          <Marker icon={ redMarker } key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/explore/${building._id}`}>
                <div className="popup">
                  <h2>{building.name}</h2>
                  <img src={building.icon}/>
                  <p>{building.architect}</p>
                </div>
              </Link>
            </Popup>
          </Marker>
        )}
        {likedBuildings && likedBuildings.map(building =>
          <Marker icon={ yellowMarker } key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/explore/${building._id}`}>
                <div className="popup">
                  <h2>{building.name}</h2>
                  <img src={building.icon}/>
                  <p>{building.architect}</p>
                </div>
              </Link>
            </Popup>
          </Marker>
        )}
        {allBuildings && allBuildings.map(building =>
          <Marker icon={ blueMarker } key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/explore/${building._id}`}>
                <div className="popup">
                  <h2>{building.name}</h2>
                  <img src={building.icon}/>
                  <p>{building.architect}</p>
                </div>
              </Link>
            </Popup>
          </Marker>
        )}
        {followedBuildings && followedBuildings.map(building =>
          <Marker icon={ greenMarker } key={building._id} position={[building.location.lat, building.location.lng]}>
            <Popup>
              <Link to={`/explore/${building._id}`}>
                <div className="popup">
                  <h2>{building.name}</h2>
                  <img src={building.icon}/>
                  <p>{building.architect}</p>
                </div>
              </Link>
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default HomeMap;
