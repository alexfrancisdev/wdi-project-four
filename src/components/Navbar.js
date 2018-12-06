import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <ul>
          <li><Link className="navbar-item" to="/"/></li>
          <li><Link /></li>
        </ul>

      </div>
    );
  }
}

export default Navbar;
