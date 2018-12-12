import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { tokenUserId, authorizationHeader } from '../../lib/auth';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
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
                  <div></div>
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
                    <h1 className="subtitle is-size-7-mobile">Email Address: {user.email}</h1>
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
                building => <Link to={`/explore/${building._id}`} key={building._id}>
                  <div className="filteredBuilding-box columns is-mobile">
                    <div className="column is-one-quarter">
                      <figure className="image is-1by1">
                        <img src={building.icon}/>
                      </figure>
                    </div>
                    <div className="column is-three-quarters">
                      <p className="is-size-6-mobile">{building.name}</p>
                      <p className="is-size-7-mobile">{building.architect}</p>
                    </div>
                  </div>
                </Link>
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
