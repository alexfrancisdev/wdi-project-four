import React from 'react';
import axios from 'axios';
import { tokenUserId } from '../../lib/auth';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
  }

  render() {
    const user = this.state.user;
    const currentUserId = tokenUserId();
    console.log('====>', user);
    return(
      <div>
        {user
          ?
          <div className="has-text-centered">
            <div className="columns is-mobile is-centered">
              <figure className="column is-2 image is-48x48">
                <img src={user.image} className="is-rounded"/>
              </figure>
            </div>
            <h1 className="title">{user.username}</h1>
            {currentUserId === user._id
              ?
              <h1 className="subtitle is-size-3-mobile">Email Address: {user.email}</h1>
              :
              <h1 className="subtitle is-size-3-mobile"></h1>}
            <div>
              {currentUserId === user._id
                ?
                <h1 className="subtitle is-size-3-mobile">Your Pins</h1>
                :
                <h1 className="subtitle is-size-3-mobile">Pins</h1>}
              {user && user.buildingsAdded.map(
                building => <div key={building._id}>
                  <p className="subtitle is-size-5-mobile">{building.name}</p>
                  <img src={building.icon} />
                </div>
              )}
            </div>
          </div>
          :
          <p>Please wait...</p>}
      </div>
    );
  }
}

export default UserShow;
