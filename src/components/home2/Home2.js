// import React from 'react';
// import axios from 'axios';
// import Mapbox from './Mapbox';
//
// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userPosition: null,
//       viewport: {
//         // latitude: 37.785164,
//         // longitude: -100,
//         zoom: 2.8,
//         bearing: 0,
//         pitch: 0,
//         width: 500,
//         height: 500
//       }
//     };
//     this.getLocation = this.getLocation.bind(this);
//     this.getBuildings = this.getBuildings.bind(this);
//   }
//
//   getLocation(pos) {
//     this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
//       this.getBuildings();
//     });
//   }
//
//   getBuildings() {
//     axios.get('/api/buildings')
//       .then(res => this.setState({ buildings: res.data }, () => console.log('this is state, ', this.state)));
//   }
//
//   getMyBuildings() {
//     //Need to do an axios get to the user then set it to state
//     axios.get('/api/users/currentUserId');
//   }
//
//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings);
//     console.log('this.state', this.state);
//   }
//
//   render() {
//     return (
//       <section className="map-container">
//         <div className="box-container">
//           {!this.state.userPosition && !this.state.buildings
//             ?
//             <p className="is-size-6-mobile centered-container">Loading map...</p>
//             :
//             <Mapbox
//               userPosition={this.state.userPosition}
//               buildings={this.state.buildings}
//               viewport={this.state.viewport} />
//           }
//         </div>
//       </section>
//     );
//   }
// }
// export default Home;
