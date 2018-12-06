import React from 'react';
import axios from 'axios';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ComponentDidMount() {
    axios
      .get('/api/buildings')
      .then(result => this.setState({ buildings: result.data }));
  }

  render() {
    return (
      <section>
        Explore
      </section>
    );
  }
}

export default Explore;
