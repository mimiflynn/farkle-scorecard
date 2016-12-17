import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isDuplicate, isEmpty } from '../../../utils/utils';

class PlayerForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: {},
      value: {
        onBoard: false,
        score: 0,
        turnCount: 0
      }
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
    if (!this.state.value.name) {
      errors.name = 'Please enter a name';
    }
    if (isDuplicate(this.state.value.name, 'name', this.props.players)) {
      errors.name = 'This person has already been added';
    }

    if (isEmpty(errors)) {
      // no errors so save data
      player = this.state.value;
      this.props.submitForm(player);
      this.setState({
        value: {
          onBoard: false,
          score: 0,
          turnCount: 0
        }
      });
      // clear text field for another player
      document.getElementById('name').value = '';
    } else {
      // show errors
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
    return (
      <div className="container template-with-sidebar-section">
        <div className="margin-bottom-20">
          <h2 className="text-upper"><span className="icon-user-plus">&nbsp;</span>Add Player</h2>
          <form id="player-form" name="player-form" onChange={this.handleChange} onSubmit={this.handleSubmitForm}>
            <div className="form-group row">
              <label htmlFor="name" className="col-xs-2 col-form-label">Name</label>
              <div className="col-xs-8">
                <input type="text" className="form-control" name="name" id="name" aria-describedby="name" placeholder="" />
              </div>
              <div className="col-xs-2">
                <button type="submit" className="btn primary-btn">Submit
                  <span className="button-addon icon-Arrow-Chevron-Right" />
                </button>
              </div>
            </div>
            {(!isEmpty(this.state.errors)) ? this.renderError('name') : null}
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
