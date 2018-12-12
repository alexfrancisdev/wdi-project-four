import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../../lib/auth';
import { handleChange } from '../../lib/common';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/register', this.state)
      .then(res => {
        saveToken(res.data.token);
      })
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.history.replace('/login');
      });
  }

  render() {
    return (
      <div className="centered-container-plus">
        <h1 className="subtitle is-size-3-mobile">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input
              className="input"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input
              className="input"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <button className="button is-dark is-outlined is-large is-fullwidth">Submit</button>
          <hr/>
          <p className="is-size-7 has-text-centered">Already registered? Login below</p>
          <Link to="/login" name="new-building">
            <button className="button is-outlined is-medium is-fullwidth">Login</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
