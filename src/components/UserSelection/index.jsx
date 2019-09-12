import React from 'react';
import PropTypes from 'prop-types';

import connect from 'utils/connect';
import { getSelectionRequest } from 'store/modules/userSelection/index';

import './UserSelectionForm.scss';

/**
 * Component for article vote
 * @summary composes the upvote and the downvote icons along with the vote count
 */
class UserSelectionForm extends React.Component {
  static propTypes = {
    selectionOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    getSelectionRequest: PropTypes.func.isRequired
  };

  handleClick = (event) => {
    const { getSelectionRequest: articlesCategory } = this.props;
    const targetElement = event.target;
    articlesCategory({
      query: targetElement.id
    });
  }

  render() {
    const { selectionOptions } = this.props;
    const selectionList = selectionOptions.map((selection) => (
      <label htmlFor={selection.id} key={selection.id} className="selection-options__label">
        <input type="radio" id={selection.id} name="selected" onClick={this.handleClick} className="selection-options__radio" />
        {selection.copy}
        {selection.category}
      </label>
    ));
    return (
      <form className="selection-options">
        {selectionList}
      </form>
    );
  }
}

export default connect({ getSelectionRequest })(UserSelectionForm);
