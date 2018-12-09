import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { tokenUserId } from '../../lib/auth';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
  }

  handleFollow() {
    const currentUserId = tokenUserId();
    console.log('this.state.currentUserId ====>',currentUserId);
    console.log('this.state.user ====>',this.state.user);

    this.state.user.push(currentUserId);
  }

  render() {
    const user = this.state.user;
    const currentUserId = tokenUserId();
    console.log(this.state);
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
                  <p></p>
                  :
                  <button onClick={this.handleFollow} className="button">Follow</button>}
              </div>
            </div>

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

            {user.following.length >= 1
              ?
              <div>
                <h1 className="user-subtitle is-size-5-mobile">Following</h1>
                <div className="box">
                  <h1 className="subtitle is-size-7-mobile">Followed by: {user.following}</h1>
                </div>
              </div>
              :
              <p></p>}

          </div>
          :
          <p className="is-size-6-mobile centered-container">Please wait...</p>}
      </div>
    );
  }
}

export default UserShow;
