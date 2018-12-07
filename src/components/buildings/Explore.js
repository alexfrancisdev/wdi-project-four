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
      building.name.toLowerCase().startsWith(query.toLowerCase()) ||
      building.architect.toLowerCase().startsWith(query.toLowerCase())
    );
    console.log('state ==>', this.state);
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
        <div>
          <h1>Search</h1>
          <form>
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              // value={this.search}
              onChange={this.handleInputChange}
              className="form-input"
            />
          </form>
        </div>
        <hr/>
        <div>
          <h1 className="subtitle">Results</h1>
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
