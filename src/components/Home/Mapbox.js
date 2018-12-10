<<<<<<< HEAD
// accessToken: pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw
// id: 'mapbox.light-v9'
// style url mapbox://styles/mapbox/light-v9


// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.light-v9',
//     accessToken: 'pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw'
// }).addTo(mymap);


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
=======
// import React from 'react';
// // import ReactDOM from 'react-dom'
// import mapboxgl from 'mapbox-gl';
//
// mapboxgl.accessToken = 'pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw';
//
// class Mapbox extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 5,
//       lat: 34,
//       zoom: 1.5
//     };
//   }
//
//   componentDidMount() {
//     const { lng, lat, zoom } = this.state;
//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: 'mapbox://styles/mapbox/streets-v9',
//       center: [lng, lat],
//       zoom
//     });
//
//     map.on('move', () => {
//       const { lng, lat } = map.getCenter();
//
//       this.setState({
//         lng: lng.toFixed(4),
//         lat: lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2)
//       });
//     });
//   }
//
//   render() {
//     const { lng, lat, zoom } = this.state;
//     return (
//       <div>
//         <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
//           <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
//         </div>
//         <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
//       </div>
//     );
//   }
// }
//
// export default Mapbox;
>>>>>>> development
