import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { tokenUserId } from '../../lib/auth';

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

  // SB do you know what I'm doing wrong here. It's not setting to State properly
  handleFollow() {
    const currentUserId = tokenUserId();
    const followedBy = this.state.user.followedBy;
    followedBy.push(currentUserId);
    this.setState({ followedBy: followedBy });
    console.log('this.state.user.followedBy.toString() ====>', this.state.user.followedBy.toString());
    console.log('currentUserId ====>',currentUserId);
  }

  handleUnfollow() {
    const currentUserId = tokenUserId();
    const followedBy = this.state.user.followedBy;
    followedBy.splice(followedBy.indexOf(currentUserId), 1);
    this.setState({ followedBy: followedBy });
    console.log('this.state.user.followedBy', this.state.user.followedBy);
    console.log('currentUserId ====>',currentUserId);
  }

  render() {
    const user = this.state.user;
    const currentUserId = tokenUserId();
    console.log('THIS STATE USER', this.state.user);
    return(
      <div>
        {user
          ?
          <div className="centered-container">
            <div className="columns is-centered is-mobile is-multiline">
              <div className="column is-2">
                <figure className="image is-48x48">
                  <img src={user.image} className="is-rounded"/>
                </figure>
              </div>

              <div className="has-text-centered column is-12">
                <h1 className="title">{user.username}</h1>
                {currentUserId === user._id
                  ?
                  <div>
                    {user.following.length >= 1
                      ?
                      <div>
                        <h1 className="user-subtitle is-size-5-mobile">Following</h1>
                        {user.following && user.following.map(
                          user =>
                            <div key={user._id}>
                              <p className="is-size-7-mobile">{user}</p>
                            </div>
                        )}
                      </div>
                      :
                      <p></p>}

                  </div>
                  :
                  <div>
                    {/* {this.state.user.followedBy.toString() === tokenUserId()
                      ?
                      <button onClick={this.handleUnfollow} className="button">Unfollow</button>
                      :
                      <button onClick={this.handleFollow} className="button">Follow</button>} */}
                    <button onClick={this.handleUnfollow} className="button">Unfollow</button>
                    <button onClick={this.handleFollow} className="button">Follow</button>
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
                  <div className="box columns is-mobile is-gapless">
                    <figure className="image column is-4">
                      <img src={building.icon} />
                    </figure>
                    <div className="column is-8">
                      <p className="subtitle is-size-5-mobile">{building.name}</p>
                      <p className="subtitle is-size-7-mobile">{building.architect}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>



          </div>
          :
          <p className="is-size-6-mobile centered-container">Please wait...</p>}
      </div>
    );
  }
}

export default UserShow;
