import React from 'react';
import axios from 'axios';

import { authorizationHeader } from '../../lib/auth';

class NewTour extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    axios.post('/api/tours', this.state, authorizationHeader())
      .then(result => {
        console.log('new tour is', result);
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
            <label className="label">Building</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.buildings || ''} name="buildings" className="input" type="text" placeholder="Building ID" />
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
