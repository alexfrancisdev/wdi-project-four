import React from 'react';
import axios from 'axios';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`/api/buildings/${this.props.match.params.id}`)
      .then(result => this.setState({ building: result.data }));
  }

  render() {
    console.log('On state! =====>', this.state.building);
    const building = this.state.building;
    return(
      <div>
        {building
          ?
          <div className="has-text-centered">
            <figure className="image is-1by1">
              <img src={building.icon} className="is-rounded"/>
            </figure>
            <h1 className="title">{building.name}</h1>
            <h1 className="subtitle">{building.architect}</h1>
            <h1 className="subtitle">{building.addedBy}</h1>
          </div>
          :
          <p>Please wait...</p>}

      </div>
    );
  }
}

export default Show;
