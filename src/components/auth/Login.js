import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login', this.state)
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
        <h1 className="subtitle is-size-3-mobile">Log In</h1>
        <form onSubmit={this.handleSubmit}>
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
          <button className="button is-light">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
