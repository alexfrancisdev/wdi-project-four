import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { tokenUserId, authorizationHeader, deleteToken } from '../../lib/auth';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
  }

  handleFollow() {
    const currentUserId = tokenUserId();
    const followedBy = this.state.user.followedBy;
    followedBy.push(currentUserId);
    this.setState({ followedBy: followedBy });
    axios.post(`/api/users/${this.props.match.params.id}/follow`, this.state, authorizationHeader());
  }

  handleUnfollow() {
    const currentUserId = tokenUserId();
    const followedBy = this.state.user.followedBy;
    followedBy.splice(followedBy.indexOf(currentUserId), 1);
    this.setState({ followedBy: followedBy });
    axios.post(`/api/users/${this.props.match.params.id}/unfollow`, this.state, authorizationHeader());
  }

  handleLogout() {
    deleteToken();
    this.props.history.push('/landing');
  }

  handleDelete(event){
    const clicked = event.currentTarget.id;
    console.log(this.state.user.buildingsAdded);
    console.log(event.target.value);
    this.state.user.buildingsAdded.map(function(object) {
      // if(this.state.user.buildingsAdded.includes(clicked)) {
      //   console.log('got it!');
      // }
      console.log('clicked', clicked, 'object', object);
    });
  }

  render() {
    const user = this.state.user;
    const currentUserId = tokenUserId();
    return(
      <div>
        {user
          ?
          <div className="centered-container">
            <div>
              <div className="columns is-centered is-mobile">
                <div className="column is-4">
                  <figure className="image is-1by1">
                    <img src={user.image} className="is-rounded profile-image"/>
                  </figure>
                </div>
              </div>

              <div className="has-text-centered">
                <h1 className="title">{user.username}</h1>
                {currentUserId === user._id
                  ?
                  <div>
                    <a onClick={this.handleLogout} className="button is-danger is-outlined">
                      <span>Sign Out</span>
                      <span className="icon is-small">
                        <i className="fas fa-sign-out-alt"></i>
                      </span>
                    </a>
                  </div>
                  :
                  <div>
                    {this.state.user.followedBy.toString().includes(tokenUserId())
                      ?
                      <button onClick={this.handleUnfollow} className="button">Unfollow</button>
                      :
                      <button onClick={this.handleFollow} className="button">Follow</button>}
                  </div>}
              </div>
            </div>
            <div>
              {currentUserId === user._id
                ?
                <div>
                  <h1 className="user-subtitle is-size-5-mobile">Your Details</h1>
                  <div className="box">
                    <h1 className="subtitle is-size-6-mobile">Email Address: {user.email}</h1>
                  </div>
                </div>
                :
                <p></p>}
            </div>
            <div>
              {currentUserId === user._id
                ?
                <h1 className="user-subtitle is-size-5-mobile">Your Pins</h1>
                :
                <h1 className="user-subtitle is-size-5-mobile">Pins</h1>}

              {user && user.buildingsAdded.map(
                building =>
                  <div  key={building._id}>
                    <div className="filteredBuilding-box columns is-mobile">
                      <div className="column is-3">
                        <figure className="image is-1by1">
                          <Link to={`/explore/${building._id}`}><img src={building.icon}/></Link>
                        </figure>
                      </div>

                      <div className="column is-7">
                        <p className="is-size-6-mobile">{building.name}</p>
                        <p className="is-size-6-mobile is-italic">{building.architect}</p>
                      </div>

                      {currentUserId === user._id
                        ?
                        <div className="column is-2" onClick={this.handleDelete}>
                          <i className="far fa-times-circle"></i>
                        </div>
                        :
                        <p></p>}
                    </div>
                  </div>

              )}
            </div>

            <div>
              {currentUserId === user._id
                ?
                <div>
                  {user.following.length >= 1
                    ?
                    <div>
                      <h1 className="user-subtitle is-size-5-mobile">Following</h1>
                      <div className="box">
                        {user.following && user.following.map(
                          user =>
                            <div  key={user._id} className="columns is-mobile">
                              <div className="column is-2">
                                <figure className="image is-1by1">
                                  <img className="is-rounded" src={user.image}/>
                                </figure>
                              </div>
                              <Link id={user._id} to={`/user/${user._id}`} className="column is-10"><p className="is-size-6-mobile">{user.username}</p></Link>
                            </div>
                        )}
                      </div>
                      <br/>
                    </div>
                    :
                    <p></p>}
                </div>
                :
                <div></div>}
            </div>
          </div>
          :
          <p className="is-size-6-mobile centered-container">Please wait...</p>}
      </div>
    );
  }
}

export default UserShow;
