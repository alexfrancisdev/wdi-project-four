import React from 'react';
import axios from 'axios';

import HomeMap from './HomeMap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getBuildings = this.getBuildings.bind(this);

  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getBuildings();
    });
  }

  getBuildings() {
    axios.get('/api/buildings')
      .then(res => this.setState({ buildings: res.data }, () => console.log('this is state, ', this.state)));
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings);
  }

  render() {
    return (
      <section className="map-container">
        <div className="box-container">
          {!this.state.userPosition && !this.state.buildings
            ?
            <p className="is-size-6-mobile centered-container">Loading map...</p>
            :
            <HomeMap
              userPosition={this.state.userPosition}
              buildings={this.state.buildings} />
          }
        </div>
      </section>
    );
  }
}
export default Home;
