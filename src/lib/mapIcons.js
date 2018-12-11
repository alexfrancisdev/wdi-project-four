import L from 'leaflet';

import ExtraMarkers from './markers/js/leaflet.extra-markers.js';

const redMarker = new L.ExtraMarkers.Icon({
  icon: '',
  markerColor: 'orange-dark',
  shape: 'circle',
  prefix: ''
});

const greenMarker = new L.ExtraMarkers.Icon({
  icon: '',
  markerColor: 'green',
  shape: 'circle',
  prefix: ''
});

const yellowMarker = new L.ExtraMarkers.Icon({
  icon: '',
  markerColor: 'yellow',
  shape: 'circle',
  prefix: ''
});

const blueMarker = new L.ExtraMarkers.Icon({
  icon: '',
  markerColor: 'cyan',
  shape: 'circle',
  prefix: ''
});

const userMarker = new L.Icon({
  iconUrl: require('../assets/icons/user-icon.png'),
  iconRetinaUrl: require('../assets/icons/user-icon.png'),
  fillOpacity: 0.5,
  iconAnchor: null,
  popupAnchor: [0, -5],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 20),
  className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

export { redMarker, greenMarker, yellowMarker, blueMarker, userMarker };
