import React from 'react';
import { Map, TileLayer, Marker, Popup, L} from 'react-leaflet';
import { Link } from 'react-router-dom';

const TourMap = () => {
  return (
    <div id='map'>
      <Map zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw'
        />
        L.Control.geocoder().addTo(map);
      </Map>
    </div>
  );
};

export default TourMap;
