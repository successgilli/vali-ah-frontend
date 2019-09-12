import React from 'react';

import Proptypes from 'prop-types';

import connect from 'utils/connect';

import UserSelectionForm from '../UserSelection';
import './ModalSection.scss';
import selectionCategory from '../../../articleCategories';


const ModalSectionComponent = (props) => {
  const { userSelection } = props;
  return (
    <section className="modal-background">
      <div className="modal-background__selection-background">
        <h3 className="modal-background__selection-background__header">
          If theres one thing you feel you badly need to cultivate
          in your life at the moment, what would that be?
        </h3>
        <UserSelectionForm selectionOptions={selectionCategory} />
        <div className={userSelection.isLoading ? 'show' : 'hide'}>
          <div className="ui active inline loader"> Loading </div>
        </div>
      </div>
    </section>
  );
};

ModalSectionComponent.propTypes = {
  userSelection: Proptypes.shape({
    isLoading: Proptypes.bool.isRequired
  }).isRequired
};

export default connect({})(ModalSectionComponent);
