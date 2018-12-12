import React from 'react';
import axios from 'axios';
import BuildingBox from './BuildingBox';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    });
    let filteredBuildings = this.state.filteredBuildings;
    const buildings = this.state.buildings;
    const query = this.state.query;
    filteredBuildings = buildings.filter(building =>
      building.name.toLowerCase().includes(query.toLowerCase()) ||
      building.architect.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredBuildings: filteredBuildings });
  }

  componentDidMount() {
    axios
      .get('/api/buildings')
      .then(result => this.setState({ buildings: result.data, filteredBuildings: result.data }));
  }

  render() {
    return (
      <section>
        <div className="centered-container">
          <form>
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              // value={this.search}
              onChange={this.handleInputChange}
              className="form-input subtitle is-size-6-mobile"
            />
          </form>
        </div>
        <div className="centered-container">
          <div>
            {this.state.query === ''
              ?
              <h1 className="explore-title is-size-4-mobile">All Buildings</h1>
              :
              <h1 className="explore-title is-size-4-mobile">Search Results</h1>}
          </div>

          <div>
            {this.state.filteredBuildings && this.state.filteredBuildings.map(
              filteredBuilding => <BuildingBox key={filteredBuilding._id} filteredBuilding={filteredBuilding}/>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Explore;
