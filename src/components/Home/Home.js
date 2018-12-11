import React from 'react';
import axios from 'axios';
// import { tokenUserId } from '../../lib/auth';
import HomeMap from './HomeMap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: null,
      allBuildingsStatus: true
    };
    this.getLocation = this.getLocation.bind(this);
    this.getBuildings = this.getBuildings.bind(this);
    // this.getUser = this.getUser.bind(this);
    this.handleButtonToggle = this.handleButtonToggle.bind(this);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getBuildings();
    });
  }

  getBuildings() {
    axios.get('/api/buildings')
      .then(result => this.setState({ buildings: result.data, filteredBuildings: result.data }, () => {
        console.log('this is state, ', this.state);
        // this.getUser();
      }));
  }

  // Tuesday pick up from here
  // getUser() {
  //   const currentUserId = tokenUserId();
  //   console.log('currentUserId', currentUserId);
  //   axios.get(`/api/users/${currentUserId}`)
  //     .then(res => this.setState({ user: res.data }), () => console.log('this.state', this.state));
  // }

  handleButtonToggle() {
    let filteredBuildings = [];
    if(!this.state.allBuildingsStatus) {
      filteredBuildings =  this.state.buildings;
    }
    this.setState({ allBuildingsStatus: !this.state.allBuildingsStatus, filteredBuildings: filteredBuildings });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings);
    // navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings, this.getUser);
  }

  render() {
    return (
      <section className="map-container">
        <div className="home-buttons centered-container ">

          <form>
            <label >
              <input
                className="home-button-input"
                name="allBuildings"
                type="checkbox"
                checked={this.state.allBuildingsStatus}
                value="allBuildingsStatus"
                onChange={this.handleButtonToggle}
              />
              <span className="is-size-5-mobile">All</span>
            </label>
          </form>


        </div>
        <div className="box-container">
          {!this.state.userPosition
            ?
            <p className="is-size-6-mobile centered-container">Loading map...</p>
            :
            <HomeMap
              userPosition={this.state.userPosition}
              buildings={this.state.filteredBuildings}
            />
          }
        </div>
      </section>
    );
  }
}
export default Home;

// followedBuildings={}
// likedBuildings={}
