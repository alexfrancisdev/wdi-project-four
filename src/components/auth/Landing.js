import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <section className="centered-container">
      <h2 className="subtitle is-size-4-mobile">Welcome to Placeholder, the place for architecture nerds</h2>
      <Link to="/login" name="new-building">
        <div>
          <p className="button is-large is-fullwidth">
            <span className="icon">
              <i className="fas fa-sign-in-alt"></i>
            </span>
            <span>Login</span>
          </p>
        </div>
      </Link>
      <br/>
      <Link to="/register" name="new-tour">
        <div>
          <p className="button is-outlined is-large is-fullwidth">
            <span className="icon">
              <i className="fas fa-user-plus"></i>
            </span>
            <span>Register</span>
          </p>
        </div>
      </Link>
    </section>
  );
}

export default Landing;
