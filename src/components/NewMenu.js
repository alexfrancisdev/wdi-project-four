import React from 'react';
import { Link } from 'react-router-dom';

function NewMenu() {
  return (
    <section className="centered-container">
      <h2 className="subtitle is-size-3-mobile">Add a new...</h2>
      <Link to="/explore/new" name="new-building">
        <a className="button is-large is-fullwidth">
          <span className="icon">
            <i className="fas fa-building"></i>
          </span>
          <span>Building</span>
        </a>
      </Link>
      <br/>
      <Link to="/tours/new" name="new-tour">
        <a className="button is-large is-fullwidth">
          <span className="icon">
            <i className="fas fa-route"></i>
          </span>
          <span>Tour</span>
        </a>
      </Link>
    </section>
  );
}

export default NewMenu;
