import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isDuplicate, isEmpty } from '../../../utils/utils';

// https://facebook.github.io/react/docs/forms.html
class PlayerForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: {},
      value: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleChange (event) {
    // convert target data into a key value pair
    const name = event.target.name;
    const value = event.target.value;
    const keyValue = {};
    keyValue[name] = value;

    this.setState({
      value: Object.assign({}, this.state.value, keyValue)
    });
  }

  handleSubmitForm (event) {
    const errors = {};
    let player = null;

    event.preventDefault();
    console.log('submit click', event);

    if (!this.state.value.name) {
      errors.name = 'Please enter a name';
    }
    if (isDuplicate(this.state.value.name, 'name', this.props.players)) {
      errors.name = 'This person has already been added';
    }

    if (isEmpty(errors)) {
      player = this.state.value;
      this.props.submitForm(player);
      this.setState({
        value: {}
      });
    } else {
      // show errors
      console.log('ERRORS');
      this.setState({ errors });
    }
  }

  renderError (id) {
    return (
      <div className="alert alert-danger" role="alert">
        {this.state.errors[id]}
      </div>
    );
  }

  render () {
    console.log('state!', this.state);
    return (
      <div className="container template-with-sidebar-section">
        <div className="margin-bottom-20">
          <h2 className="text-upper">Add Player</h2>
          <form id="player-form" name="player-form" onChange={this.handleChange} onSubmit={this.handleSubmitForm}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" id="name" aria-describedby="name" placeholder="" />
            </div>
            {(!isEmpty(this.state.errors)) ? this.renderError('name') : null}
            <button type="submit" className="btn primary-btn">Submit
              <span className="button-addon icon-Arrow-Chevron-Right" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

PlayerForm.propTypes = {
  players: PropTypes.array,
  submitForm: PropTypes.func,
  dispatch: PropTypes.func
};

function mapStateToProps (state) {
  return state.player;
}

export default connect(mapStateToProps)(PlayerForm);
