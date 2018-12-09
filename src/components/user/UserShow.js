import React from 'react';
import axios from 'axios';
import { tokenUserId, decodeToken } from '../../lib/auth';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('decodeToken ===>', decodeToken().sub);
  }

  // componentDidMount() {
  //   axios.get(`/api/user/${decodeToken().sub}`)
  //     .then(result => this.setState({ user: result.data }), () => console.log('this.state ===>', this.state));
  // }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
  }


  render() {
    const user = this.state.user;
    const currentUserId = tokenUserId();
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
              </div>
            </div>

            {currentUserId === user._id
              ?
              <div>
                <h1 className="subtitle is-size-5-mobile">Your Details</h1>
                <div className="box">
                  <h1 className="subtitle is-size-7-mobile">Email Address: {user.email}</h1>
                </div>
              </div>
              :
              <h1 className="subtitle is-size-3-mobile"></h1>}

            <div>
              {currentUserId === user._id
                ?
                <h1 className="subtitle is-size-5-mobile">Your Pins</h1>
                :
                <h1 className="subtitle is-size-5-mobile">Pins</h1>}

              {user && user.buildingsAdded.map(
                building => <div key={building._id} className="box columns is-mobile is-gapless">
                  <figure className="image column is-4">
                    <img src={building.icon} />
                  </figure>
                  <div className="column is-8">
                    <p className="subtitle is-size-5-mobile">{building.name}</p>
                    <p className="subtitle is-size-7-mobile">{building.architect}</p>
                  </div>
                </div>
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
