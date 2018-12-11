import React from 'react';
import axios from 'axios';
import { tokenUserId } from '../../lib/auth';
import HomeMap from './HomeMap';
const currentUserId = tokenUserId();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: null,
      allBuildingsStatus: true,
      myBuildingsStatus: true,
      likedBuildingsStatus: true
    };
    this.getLocation = this.getLocation.bind(this);
    this.getAllBuildings = this.getAllBuildings.bind(this);
    this.getMyBuildings = this.getMyBuildings.bind(this);
    this.getLikedBuildings = this.getLikedBuildings.bind(this);
    this.getFollowedBuildings = this.getFollowedBuildings.bind(this);
    this.handleAllButtonToggle = this.handleAllButtonToggle.bind(this);
    this.handleMyButtonToggle = this.handleMyButtonToggle.bind(this);
    this.handleLikedButtonToggle = this.handleLikedButtonToggle.bind(this);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getAllBuildings();
    });
  }

  getAllBuildings() {
    axios.get('/api/buildings')
      .then(result => this.setState({ buildings: result.data, filteredBuildings: result.data }, () => {
        console.log('this is state, ', this.state);
      }));
  }

  getMyBuildings() {
    const myBuildings = [];
    axios.get('/api/buildings')
      .then(result => {
        result.data.map(function(object) {
          if(object.addedBy === currentUserId) {
            myBuildings.push(object);
          }
        });
        this.setState({ myBuildings: myBuildings});
        console.log('state', this.state);
      });
  }

  getLikedBuildings() {
    const likedBuildings = [];
    axios.get('/api/buildings')
      .then(result => {
        result.data.map(function(object) {
          if(object.likes.includes(currentUserId)) {
            likedBuildings.push(object);
          }
        });
        this.setState({ likedBuildings: likedBuildings}, () => console.log('STATE', this.state));
      });
  }

  getFollowedBuildings() {
    const followedBuildings = [];
    axios.get('/api/users')
      .then(result => {
        result.data.map(function(object) {
          if(object.likes.includes(currentUserId)) {
            followedBuildings.push(object);
          }
        });
        this.setState({ followedBuildings: followedBuildings}, () => console.log('STATE', this.state));
      });
  }

  handleAllButtonToggle() {
    let filteredBuildings = [];
    if(!this.state.allBuildingsStatus) {
      filteredBuildings =  this.state.buildings;
    }
    this.setState({ allBuildingsStatus: !this.state.allBuildingsStatus, allBuildings: filteredBuildings }), () => console.log('STATE', this.state);
  }

  handleMyButtonToggle() {
    this.getMyBuildings();
    this.setState({ myBuildingsStatus: !this.state.myBuildingsStatus, myBuildings: this.state.myBuildings }), () => console.log('STATE', this.state);
  }

  handleLikedButtonToggle() {
    this.getLikedBuildings();
    this.setState({ likedBuildingsStatus: !this.state.likedBuildingsStatus, likedBuildings: this.state.likedBuildings }), () => console.log('STATE', this.state);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings);
  }

  render() {
    return (
      <section className="map-container">
        <div className="home-buttons centered-container ">

          <form className="columns is-multiline is-mobile">
            <label className="home-button-container column is-3">
              <input
                className="home-button-input"
                name="myBuildings"
                type="checkbox"
                checked={this.state.myBuildingsStatus}
                value="myBuildingsStatus"
                onChange={this.handleMyButtonToggle}
              />
              <span className="is-size-6-mobile">My</span>
            </label>

            <label className="home-button-container column is-3">
              <input
                className="home-button-input"
                name="likedBuildings"
                type="checkbox"
                checked={this.state.likedBuildingsStatus}
                value="likedBuildingsStatus"
                onChange={this.handleLikedButtonToggle}
              />
              <span className="is-size-6-mobile">Liked</span>
            </label>

            <label className="home-button-container column is-3">
              <input
                className="home-button-input"
                name="allBuildings"
                type="checkbox"
                checked={this.state.allBuildingsStatus}
                value="allBuildingsStatus"
                onChange={this.handleAllButtonToggle}
              />
              <span className="is-size-6-mobile">All</span>
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
              allBuildings={this.state.allBuildings}
              myBuildings={this.state.myBuildings}
              likedBuildings={this.state.likedBuildings}
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
