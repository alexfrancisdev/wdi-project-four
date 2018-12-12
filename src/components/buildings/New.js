import React from 'react';
import axios from 'axios';

import { authorizationHeader } from '../../lib/auth';

class NewBuilding extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLatLngChange = this.handleLatLngChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    axios.post('/api/buildings', this.state, authorizationHeader())
      .then(result => {
        this.props.history.push(`/explore/${ result.data._id }`);
      });
  }

  handleLatLngChange({ target: { name, value }}){
    this.setState({ location: { ...this.state.location, [name]: value }});
  }

  handleChange({ target: { name, value }}){
  }

  render(){
    return(
      <section className="centered-container">
        <h2 className="subtitle is-size-3-mobile">Add a new building</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Building Name</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.name || ''} name="name" className="input" type="text" placeholder="Name of the building" />
            </div>
          </div>
          <div className="field">
            <label className="label">Architect</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.architect || ''} name="architect" className="input" type="text" placeholder="Name of the architect" />
            </div>
          </div>
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.icon || ''} name="icon" className="input" type="text" placeholder="Enter an image URL" />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea onChange={this.handleChange} value={this.state.description || ''} name="description" className="textarea" type="text" placeholder="Description..." />
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input onChange={this.handleLatLngChange} value={this.state.location.lat || ''} name="lat" className="input" type="text" placeholder="Latitude of the building" />
            </div>
            <div className="control">
              <input onChange={this.handleLatLngChange} value={this.state.location.lng || ''} name="lng" className="input" type="text" placeholder="Longditude of the building" />
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


export default NewBuilding;
