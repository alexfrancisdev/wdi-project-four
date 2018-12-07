import React from 'react';
import axios from 'axios';
// import SearchExplore from './SearchExplore';
import BuildingBox from './BuildingBox';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }


  handleFilter() {
    if (this.state.buildings[0].name.toLowerCase().startsWith(this.state.query.toLowerCase())) {
      console.log('----------match', this.state.buildings[0].name);
    } else if (this.state.buildings[0].architect.toLowerCase().startsWith(this.state.query.toLowerCase())) {
      console.log('----------match', this.state.buildings[0].architect);
    } else if (!this.state.buildings[0].name.toLowerCase().startsWith(this.state.query.toLowerCase()) ||
    this.state.buildings[0].architect.toLowerCase().startsWith(this.state.query.toLowerCase())) {
      console.log('---------NO match');
    }
  }


  handleInputChange() {
    this.setState({
      query: this.search.value
    });
    this.handleFilter();
  }



  componentDidMount() {
    axios
      .get('/api/buildings')
      .then(result => this.setState({ buildings: result.data }, () => console.log('===>', this.state)));
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
              onChange={this.handleInputChange}
              className="form-input"
            />
          </form>
        </div>
        <hr/>
        <div>
          <h1 className="subtitle">Results</h1>
          <div>
            {this.state.buildings && this.state.buildings.map(
              building => <BuildingBox key={building._id} building={building}/>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Explore;
