import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// https://facebook.github.io/react/docs/forms.html
class PlayerForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange (event) {
    // capture form value as user adds to form
    console.log('change', event.target);

    // convert target data into a key value pair
    const name = event.target.name;
    const value = event.target.value;
    const keyValue = {};
    keyValue[name] = value;

    this.setState({
      value: Object.assign({}, this.state.value, keyValue)
    });
    console.log('state', this.state.value);
  }

  handleSubmitForm (event) {
    const errors = [];
    let player = null;

    event.preventDefault();
    console.log('submit click', event);

    if (!this.state.value.name) {
      errors.push('name');
    }

    if (errors.length === 0) {
      player = this.state.value.name;
      this.props.submitForm(player);
    } else {
      // show errors
      errors.forEach((item) => {
        const node = document.getElementById(item).parentNode;
        const currentClassName = node.className;
        node.className = classnames(currentClassName, 'error');
      });
    }
  }

  render () {
    return (
      <div className="container template-with-sidebar-section">
        <div className="margin-bottom-20">
          <h2 className="text-upper">Add Player</h2>
          <form id="player-form" name="player-form" onChange={this.handleChange} onSubmit={this.handleSubmitForm}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" id="name" aria-describedby="name" placeholder="" />
            </div>
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
  player: PropTypes.object,
  submitForm: PropTypes.func,
  dispatch: PropTypes.func
};

function mapStateToProps (state) {
  return state.player;
}

export default connect(mapStateToProps)(PlayerForm);
