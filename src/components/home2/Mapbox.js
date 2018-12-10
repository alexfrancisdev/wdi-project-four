// import React from 'react';
// import MapGL from 'react-map-gl';
// // import MapGL, {NavigationControl} from 'react-map-gl';
// import { TileLayer, Marker, Popup} from 'react-leaflet';
// import { Link } from 'react-router-dom';
// import { redMarker, userMarker } from '../../lib/mapIcons';
//
//
// const TOKEN = 'pk.eyJ1Ijoic29waGlhYmFyY2xheSIsImEiOiJjanBoaDBicXcwdHl0M2tvemNyenRnNmlrIn0.OYZzci0qTG9rB9BcS-Y0hw';
// //
// // const navStyle = {
// //   position: 'absolute',
// //   top: 0,
// //   left: 0,
// //   padding: '10px'
// // };
//
// const {viewport} = this.state;
//
// const Mapbox = ({ userPosition, buildings }) => {
//   return (
//     <div id='map'>
//       <MapGL center={userPosition} zoom={14} {...viewport} mapStyle="mapbox://styles/mapbox/light-v9" mapboxApiAccessToken={TOKEN}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         />
//         {userPosition && <Marker icon={ userMarker } position={userPosition}>
//           <Popup>
//         Your location!
//           </Popup>
//         </Marker>}
//         {buildings && buildings.map(building =>
//           <Marker icon={ redMarker } key={building._id} position={[building.location.lat, building.location.lng]}>
//             <Popup>
//               <Link to={`/explore/${building._id}`}>
//                 <h2>{building.name}</h2>
//                 <img src={building.icon}/>
//                 <p>test</p>
//               </Link>
//             </Popup>
//           </Marker>
//         )}
//       </MapGL>
//     </div>
//   );
// };
//
// export default Mapbox;
//
// {/* <div className="nav" style={navStyle}>
//   <NavigationControl/>
// </div> */}
