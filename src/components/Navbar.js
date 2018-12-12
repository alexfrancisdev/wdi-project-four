import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
const FA = require('react-fontawesome');
import { deleteToken, decodeToken, isAuthenticated } from '../lib/auth';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    deleteToken();
    this.props.history.push('/login');
  }
  render() {
    return (
      <nav className="navbar is-fixed-bottom" aria-label="dropdown navigation">
        {!isAuthenticated()
          ?
          <div></div>
          :
          <div className="navbar-brand">
            <Link className="navbar-item" to="/"><FA name="home"/></Link>
            <Link className="navbar-item" to="/explore"><FA name="search"/></Link>
            <Link className="navbar-item" to="/new"><FA name="plus"/></Link>
            <Link className="navbar-item" to="/tours"><i className="fas fa-route"></i></Link>
            <Link className="navbar-item" to={`/user/${decodeToken().sub}`}><FA name="user"/></Link>
          </div>
        }
      </nav>
    );
  }
}

export default withRouter(Navbar);
