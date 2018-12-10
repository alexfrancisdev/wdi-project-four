import React from 'react';
import axios from 'axios';

import { authorizationHeader } from '../../lib/auth';

class NewTour extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBuilding = this.addBuilding.bind(this);
    this.selectedBuildings = this.selectedBuildings.bind(this);
    this.filterBuildings = this.filterBuildings.bind(this);
    this.removeBuilding = this.removeBuilding.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/buildings')
      .then(result => this.setState({ buildingSearch: result.data, filteredBuildings: result.data }));
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    }, this.filterBuildings);
  }

  filterBuildings(){
    let filteredBuildings = this.state.filteredBuildings;
    const buildings = this.state.buildingSearch;
    const query = this.state.query;
    filteredBuildings = buildings.filter(building =>
      building.name.toLowerCase().includes(query.toLowerCase()) ||
      building.architect.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredBuildings: filteredBuildings });
  }

  addBuilding(event){
    let originalBuildings = [];
    const clicked = event.currentTarget.id;
    if (this.state.buildings){
      originalBuildings = this.state.buildings.flat();
    }
    const addedBuildings = [];
    if (!originalBuildings.includes(clicked)){
      addedBuildings.push(clicked, originalBuildings);
      this.setState({ buildings: addedBuildings.flat(), query: ''}, this.selectedBuildings, console.log('state is', this.state) );
    }
  }

  selectedBuildings(){
    const selectedBuildings = [];
    const buildings = this.state.buildingSearch;
    const buildingIds = this.state.buildings;
    for (var i = 0; i < buildingIds.length; i++) {
      for (var x = 0; x < buildings.length; x++) {
        if (buildings[x]._id === buildingIds[i]){
          selectedBuildings.push(buildings[x]);
          this.setState({ selectedBuildings: selectedBuildings });
        }
      }
    }
  }

  removeBuilding(event){
    let buildings = [];
    const clicked = event.currentTarget.id;
    buildings = this.state.buildings;
    for(var i = buildings.length - 1; i >= 0; i--) {
      if(buildings[i] === clicked) {
        buildings.splice(i, 1);
        this.setState({ buildings: buildings}, this.selectedBuildings);
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    axios.post('/api/tours', this.state, authorizationHeader())
      .then(result => {
        this.props.history.push(`/tours/${ result.data._id }`);
      });
  }

  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }


  render(){
    return(
      <section className="centered-container">
        <h2 className="subtitle is-size-3-mobile">Create a new tour</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Tour Name</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.name || ''} name="name" className="input" type="text" placeholder="Name of the tour" />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea onChange={this.handleChange} value={this.state.description || ''} name="description" className="textarea" type="text" placeholder="Description..." />
            </div>
          </div>
          <div className="field">
            <label className="label">Pick an Icon</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.icon || ''} name="icon" className="input" type="text" placeholder="Image URL" />
            </div>
          </div>
          <div className="field">
            <label className="label">Buildings</label>
          </div>
          <div>
            <div>
              {this.state.selectedBuildings && this.state.selectedBuildings.map(
                selectedBuilding =>
                  <p onClick={this.removeBuilding} className="has-text-weight-light is-size-6" id={selectedBuilding._id} key={selectedBuilding._id}>{selectedBuilding.name}</p>
              )}
            </div>
            <div>

            </div>
            <input
              placeholder="Search..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              className="form-input is-size-5-mobile"
            />
            <div className="centered-container">

              <div>
                {this.state.filteredBuildings && this.state.filteredBuildings.map(
                  filteredBuilding =>
                    <div onClick={this.addBuilding} key={filteredBuilding._id} id={filteredBuilding._id} className="filteredBuilding-box columns is-mobile">
                      <div className="column is-one-quarter">
                        <figure className="image is-1by1">
                          <img src={filteredBuilding.icon}/>
                        </figure>
                      </div>
                      <div className="column is-three-quarters">
                        <p className="is-size-6-mobile">{filteredBuilding.name}</p>
                        <p className="is-size-7-mobile">{filteredBuilding.architect}</p>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}


export default NewTour;
