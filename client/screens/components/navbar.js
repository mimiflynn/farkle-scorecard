import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Navbar = () => {
  return (
    <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
      <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" />
      <div className="collapse navbar-toggleable-md" id="navbarResponsive">
        <Link to="/" className="navbar-brand"><span className="icon-dice">&nbsp;</span>Farkle Scorecard</Link>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="reference">Reference</Link>
          </li>
          <li className="nav-item">
            <Link to="rules">Rules</Link>
          </li>
          <li className="nav-item">
            <Link to="game">Current Game</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default connect(null)(Navbar);
