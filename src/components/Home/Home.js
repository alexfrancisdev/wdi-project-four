import React from 'react';
import axios from 'axios';

import HomeMap from './Map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: null,
      likedBuilding: null,
      followingBuildings: null,
      userBuildings: null,
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
      .then(res => this.setState({ buildings: res.data }));
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings);
  }

  render() {
    return (
      <section className="section">
        <h1 className="title">Buildings (hopefully)</h1>
        <div className="box-container">
          {!this.state.userPosition && !this.state.buildings
            ?
            <p>Loading map...</p>
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
