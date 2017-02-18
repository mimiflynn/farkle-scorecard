import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import Reference from '../farkle/reference';
import Rules from '../farkle/rules';

const modalStyle = {
  overlay: {
    top: '55px'
  }
};

class Navbar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      referenceOpen: false,
      rulesOpen: false
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleReferenceClick = this.handleReferenceClick.bind(this);
    this.handleRulesClick = this.handleRulesClick.bind(this);
  }

  handleReferenceClick () {
    this.setState({
      referenceOpen: true,
      rulesOpen: false
    });
  }

  handleRulesClick () {
    this.setState({
      referenceOpen: false,
      rulesOpen: true
    });
  }

  handleModalClose () {
    this.setState({
      referenceOpen: false,
      rulesOpen: false
    });
  }

  render () {
    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
        <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" />
        <div className="collapse navbar-toggleable-md" id="navbarResponsive">
          <Link to="/" className="navbar-brand"><span className="icon-dice">&nbsp;</span>Farkle Scorecard</Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <button onClick={this.handleReferenceClick}>Reference</button>
            </li>
            <li className="nav-item">
              <button onClick={this.handleRulesClick}>Rules</button>
            </li>
            <li className="nav-item">
              <Link to="game">Current Game</Link>
            </li>
          </ul>
        </div>
        <Modal
          contentLabel="Rules"
          isOpen={this.state.rulesOpen}
          onRequestClose={this.handleModalClose}
          style={modalStyle}
        >
          <Rules />
        </Modal>
        <Modal
          contentLabel="Reference"
          isOpen={this.state.referenceOpen}
          onRequestClose={this.handleModalClose}
          style={modalStyle}
        >
          <Reference />
        </Modal>
      </nav>
    );
  }
}

export default connect(null)(Navbar);
