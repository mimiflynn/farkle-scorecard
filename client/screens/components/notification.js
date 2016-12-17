import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Notification extends Component {
  constructor (props) {
    super(props);

    this.state = {
      show: true
    };
  }

  renderNotification () {
    return (
      <div className={classNames('alert', this.props.className)} role="alert">
        {this.props.children}
      </div>
    );
  }

  setTimer () {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.setState({
        show: false
      });
    }, 2000);
  }

  componentWillUnmount () {
    window.clearTimeout(this.timer);
  }

  render () {
    if (this.props.timer) this.setTimer();
    return (this.state.show) ? this.renderNotification() : null;
  }
}

Notification.propTypes = {
  timer: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Notification;
