import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import SearchExplore from './SearchExplore';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   const { target: {name, value} } = e;
  //   this.setState({ [name]: value });
  // }

  ComponentDidMount() {
    axios
      .get('/api/buildings')
      .then(result => this.setState({ buildings: result.data }));
  }

  render() {
    console.log('===>', this.state.buildings);
    return (
      <section>
        <div>
          <h1>Search</h1>
          {/* <div>
            <SearchExplore onChange={this.handleChange}/>
          </div> */}
        </div>
        <hr/>
        <div>
          <h1>Results</h1>
          <div>
            {this.state.buildings && this.state.buildings.map(
              building => <div key={building._id} building={building}>
                <Link to={`building/${building._id}`}>
                  <img src={building.icon}/>
                  <h1>{building.name}</h1>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Explore;
