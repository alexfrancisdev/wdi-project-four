import React from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
const TOKEN = 'pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 2.8,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    };
  }
  render() {
    const {viewport} = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={TOKEN}>
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
      </MapGL>
    );
  }
}
