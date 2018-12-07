import React from 'react';
import axios from 'axios';

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
    return(
      <div>
        {user
          ?
          <div className="has-text-centered">
            <h1 className="title">{user.username}</h1>
            <div>
              {user && user.buildingsAdded.map(
                building => <div key={building._id}>
                  <p>{building.name}</p>
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
