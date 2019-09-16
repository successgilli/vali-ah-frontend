// react libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// helper functions
import classNames from 'utils/classnames';

// styles
import './Message.scss';

export default class Message extends React.Component {
  static propTypes = {
    heading: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool,
    error: PropTypes.bool,
    delay: PropTypes.number
  }

  static defaultProps = {
    messages: [],
    heading: '',
    error: false,
    active: false,
    delay: 4
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { active } = this.props;

    this.setState({ active });
  }

  componentDidUpdate() {
    const { active } = this.state;
    const { delay } = this.props;

    if (active) setTimeout(() => this.setState({ close: true }), delay * 1000);
  }

  static getDerivedStateFromProps({ active }, prevState) {
    return prevState.close ? { active: false, close: false } : { active };
  }

  onMessageClose = () => this.setState({ close: true });

  render() {
    const { heading, messages, error } = this.props;
    const { active } = this.state;

    const classList = classNames('ui', { error }, 'message');

    return (
      <>
        { active && (
          <div className={classList}>
            <i role="presentation" className="close icon" onKeyPress={this.onMessageClose} onClick={this.onMessageClose} />
            <div className="header">
              {heading}
            </div>
            <ul className="list">
              {messages.map((message) => <li key={message}>{message}</li>)}
            </ul>
          </div>
        )}
      </>
    );
  }
}
