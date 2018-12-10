import React from 'react';
// import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
// import { Link } from 'react-router-dom';
// import { redMarker, userMarker } from '../../lib/mapIcons';
import MapGL, {NavigationControl} from 'react-map-gl';
const TOKEN = 'pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw';

// const Mapbox = ({ userPosition, buildings }) => {
const Mapbox = ({ userPosition }) => {
  return (
    <div id='map2'>
      <MapGL center={userPosition} zoom={14} mapStyle="mapbox://styles/mapbox/light-v9" mapboxApiAccessToken={TOKEN}>
        <div className="nav">
          <NavigationControl/>
        </div>
      </MapGL>
    </div>
  );
};

export default Mapbox;
