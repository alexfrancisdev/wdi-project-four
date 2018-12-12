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
      allBuildingsStatus: false,
      myBuildingsStatus: false,
      likedBuildingsStatus: false,
      followedBuildingsStatus: false
    };
    this.getLocation = this.getLocation.bind(this);
    this.getAllBuildings = this.getAllBuildings.bind(this);
    this.getMyBuildings = this.getMyBuildings.bind(this);
    this.getLikedBuildings = this.getLikedBuildings.bind(this);
    this.getFollowedBuildings = this.getFollowedBuildings.bind(this);
    this.handleAllButtonToggle = this.handleAllButtonToggle.bind(this);
    this.handleMyButtonToggle = this.handleMyButtonToggle.bind(this);
    this.handleLikedButtonToggle = this.handleLikedButtonToggle.bind(this);
    this.handleFollowedButtonToggle = this.handleFollowedButtonToggle.bind(this);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getAllBuildings();
    });
  }

  getAllBuildings() {
    axios.get('/api/buildings')
      .then(result => this.setState({ buildings: result.data }));
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
        this.setState({ likedBuildings: likedBuildings});
      });
  }

  getFollowedBuildings() {
    const followedBuildings = [];
    axios.get('/api/users')
      .then(result => {
        result.data.map(function(object) {
          if(object.followedBy.includes(currentUserId)) {
            followedBuildings.push(object.buildingsAdded);
          }
        });
        this.setState({ followedBuildings: followedBuildings.flat() });
      });
  }

  handleAllButtonToggle() {
    let allBuildings = [];
    if(!this.state.allBuildingsStatus) {
      allBuildings =  this.state.buildings;
    }
    allBuildings.map(function(object) {
      if (object.likes.includes(currentUserId)) {
        allBuildings.splice(allBuildings.indexOf(object), 1);
      } else if (object.addedBy === currentUserId) {
        allBuildings.splice(allBuildings.indexOf(object), 1);
      }
    });
    this.setState({ allBuildingsStatus: !this.state.allBuildingsStatus, allBuildings: allBuildings });
  }

  handleMyButtonToggle() {
    this.getMyBuildings();
    if(!this.state.myBuildingsStatus) {
      this.setState({ myBuildingsStatus: !this.state.myBuildingsStatus, myBuildings: this.state.myBuildings });
    } else if(this.state.myBuildingsStatus) {
      const myBuildings = [];
      this.setState({ myBuildingsStatus: !this.state.myBuildingsStatus, myBuildings: myBuildings });
    }
    this.setState({ myBuildingsStatus: !this.state.myBuildingsStatus, myBuildings: this.state.myBuildings });
  }

  handleLikedButtonToggle() {
    this.getLikedBuildings();
    this.setState({ likedBuildingsStatus: !this.state.likedBuildingsStatus, likedBuildings: this.state.likedBuildings });
  }

  handleFollowedButtonToggle() {
    this.getFollowedBuildings();
    this.setState({ followedBuildingsStatus: !this.state.followedBuildingsStatus, followedBuildings: this.state.followedBuildings });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getBuildings);
  }

  render() {
    return (
      <section className="map-container">
        <div className="home-buttons-container centered-container">
          <div className="columns is-mobile">
            <div className="column is-3 ckbx-style-8 mine-switch">
              <input type="checkbox" id="ckbx-style-8-1" value="1" name="ckbx-style-8" checked={this.state.myBuildingsStatus} onChange={this.handleMyButtonToggle}/>
              <label htmlFor="ckbx-style-8-1"></label>
              <p className="is-size-6-mobile">Mine</p>
            </div>
            <div className="column is-3 ckbx-style-8 liked-switch">
              <input type="checkbox" id="ckbx-style-8-2" value="1" name="ckbx-style-8" checked={this.state.likedBuildingsStatus} onChange={this.handleLikedButtonToggle}/>
              <label htmlFor="ckbx-style-8-2"></label>
              <p className="is-size-6-mobile">Liked</p>
            </div>
            <div className="column is-3 ckbx-style-8 followed-switch">
              <input type="checkbox" id="ckbx-style-8-3" value="1" name="ckbx-style-8" checked={this.state.followedBuildingsStatus} onChange={this.handleFollowedButtonToggle}/>
              <label htmlFor="ckbx-style-8-3"></label>
              <p className="is-size-6-mobile">Followed</p>
            </div>
            <div className="column is-3 ckbx-style-8 all-switch">
              <input type="checkbox" id="ckbx-style-8-4" value="1" name="ckbx-style-8" checked={this.state.allBuildingsStatus} onChange={this.handleAllButtonToggle}/>
              <label htmlFor="ckbx-style-8-4"></label>
              <p className="is-size-6-mobile">All</p>
            </div>
          </div>
          {/* <div className="ckbx-style-8">
            <input type="checkbox" id="ckbx-style-8-1" value="0" name="ckbx-style-8"/>
            <label htmlFor="ckbx-style-8-1"></label>
          </div> */}
          {/* <form className="columns is-multiline is-mobile">
            <label className="home-buttons-label column is-6-mobile is-3-desktop">
              <input
                className="home-button-input"
                // name="myBuildings"
                type="checkbox"
                checked={this.state.myBuildingsStatus}
                value="myBuildingsStatus"
                onChange={this.handleMyButtonToggle}
              />
              <span className="is-size-6-mobile is-size-5-desktop">My Buildings</span>
            </label>

            <label className="home-buttons-label column is-6-mobile is-3-desktop">
              <input
                className="home-button-input"
                name="likedBuildings"
                type="checkbox"
                checked={this.state.likedBuildingsStatus}
                value="likedBuildingsStatus"
                onChange={this.handleLikedButtonToggle}
              />
              <span className="is-size-6-mobile is-size-5-desktop">Liked Buildings</span>
            </label>

            <label className="home-buttons-label column is-6-mobile is-3-desktop">
              <input
                className="home-button-input"
                name="followedBuildings"
                type="checkbox"
                checked={this.state.followedBuildingsStatus}
                value="followedBuildingsStatus"
                onChange={this.handleFollowedButtonToggle}
              />
              <span className="is-size-6-mobile is-size-5-desktop">Followed</span>
            </label>

            <label className="home-buttons-label column is-6-mobile is-3-desktop">
              <input
                className="home-button-input"
                name="allBuildings"
                type="checkbox"
                checked={this.state.allBuildingsStatus}
                value="allBuildingsStatus"
                onChange={this.handleAllButtonToggle}
              />
              <span className="is-size-6-mobile is-size-5-desktop">All Buildings</span>
            </label>

          </form> */}

        </div>
        <div className="box-container">
          {!this.state.userPosition
            ?
            <p className="is-size-6-mobile centered-container">Loading map...</p>
            :
            <HomeMap
              userPosition={this.state.userPosition}
              buildings={this.state.allBuildings}
              allBuildings={this.state.allBuildings}
              myBuildings={this.state.myBuildings}
              likedBuildings={this.state.likedBuildings}
              followedBuildings={this.state.followedBuildings}
            />
          }
        </div>
      </section>
    );
  }
}
export default Home;
