import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-start">
          <a className="navbar-item">
            <img src="../assets/logo.png"/>
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
