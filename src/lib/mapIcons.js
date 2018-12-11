import L from 'leaflet';

import ExtraMarkers from './markers/js/leaflet.extra-markers.js';

const redMarkerNew = new L.ExtraMarkers.Icon({
  icon: 'fa-landmark',
  markerColor: 'blue',
  shape: 'square',
  prefix: 'fas'
});

const redMarker = new L.Icon({
  iconUrl: require('../assets/icons/icon-red.png'),
  iconRetinaUrl: require('../assets/icons/icon-red.png'),
  iconAnchor: null,
  popupAnchor: [0, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 41),
  className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

const greenMarker = new L.Icon({
  iconUrl: require('../assets/icons/icon-green.png'),
  iconRetinaUrl: require('../assets/icons/icon-green.png'),
  iconAnchor: null,
  popupAnchor: [0, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 41),
  className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

const pinkMarker = new L.Icon({
  iconUrl: require('../assets/icons/icon-green.png'),
  iconRetinaUrl: require('../assets/icons/icon-green.png'),
  iconAnchor: null,
  popupAnchor: [0, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 41),
  className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

const purpleMarker = new L.Icon({
  iconUrl: require('../assets/icons/icon-green.png'),
  iconRetinaUrl: require('../assets/icons/icon-green.png'),
  iconAnchor: null,
  popupAnchor: [0, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 41),
  className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

const userMarker = new L.Icon({
  iconUrl: require('../assets/icons/user-icon.png'),
  iconRetinaUrl: require('../assets/icons/user-icon.png'),
  iconAnchor: null,
  popupAnchor: [0, -5],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 20),
  className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
});

export { redMarker, greenMarker, pinkMarker, purpleMarker, userMarker, redMarkerNew };
