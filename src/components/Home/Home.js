import React from 'react';
import axios from 'axios';
import { tokenUserId } from '../../lib/auth';

import HomeMap from './HomeMap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: null,
      allBuildings: true,
      myBuildings: true
    };
    this.getLocation = this.getLocation.bind(this);
    this.getBuildings = this.getBuildings.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getBuildings();
    });
  }

  getBuildings() {
    axios.get('/api/buildings')
      .then(res => this.setState({ buildings: res.data }, () => {
        console.log('this is state, ', this.state);
        this.getUser();
      }));
  }

  // Tuesday pick up from here
  getUser() {
    const currentUserId = tokenUserId();
    console.log('currentUserId', currentUserId);
    axios.get(`/api/users/${currentUserId}`)
      .then(res => this.setState({ user: res.data }), () => console.log('this.state', this.state));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log('toggled');
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings, this.getUser);
  }

  render() {
    return (
      <section className="map-container">
        <div className="home-buttons">

          <form>
            <span><label >
              <input
                name="allBuildings"
                type="checkbox"
                checked={this.state.allBuildings}
                onChange={this.handleInputChange}
              />
              <span className="is-size-5-mobile">All</span>
            </label></span>
            <span><label>
              <input
                name="myBuildings"
                type="checkbox"
                checked={this.state.myBuildings}
                onChange={this.handleInputChange}
              />
              <span className="is-size-5-mobile">My</span>
            </label></span>
          </form>


        </div>
        <div className="box-container">
          {!this.state.userPosition && !this.state.buildings
            ?
            <p className="is-size-6-mobile centered-container">Loading map...</p>
            :
            <HomeMap
              userPosition={this.state.userPosition}
              buildings={this.state.buildings}
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
