import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar is-fixed-bottom">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/explore">Explore</Link>
          <Link className="navbar-item" to="/user/5be9860fcb16d525543ceda4">Profile</Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
