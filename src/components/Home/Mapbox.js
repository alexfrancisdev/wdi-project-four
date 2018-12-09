import React from 'react';
import { Map } from 'react-leaflet';
// import { Map, TileLayer } from 'react-leaflet';

import MapboxLayer from './MapboxLayer';
import './styles.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [51.505, -0.091],
      zoom: 13
    };
  }

  render() {
    return (
      <div>
        <Map center={this.state.center} zoom={this.state.zoom}>
          <MapboxLayer
            accessToken={MAPBOX_ACCESS_TOKEN}
          />
        </Map>
      </div>
    );
  }
}

export default MapBox;
