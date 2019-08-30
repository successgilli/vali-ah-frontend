// react libraries
import React, { Component } from 'react';

import PropTypes from 'prop-types';
// utils
import connect from 'utils/connect';
import Modal from 'components/Modal';

import HeroSection from 'components/HeroSection';
import ModalSection from 'components/ModalSection';
import ArticleCard from 'components/ArticleCard';
import CardContainer from 'components/CardContainer';
import ScrollToTopButton from 'components/ScrollToTopButton';
import request from 'modules/userSelection/requests';

/**
 * @exports
 * @class HomePage
 * @extends Component
 * @classdesc Creates HomePage Component
 *
 * @returns {JSX} HomePage Component
 */
class HomePage extends Component {
  static propTypes = {
    userSelection: PropTypes.shape({
      userSelection: PropTypes.arrayOf(PropTypes.object)
    }),
    header: PropTypes.func.isRequired
  }

  static defaultProps = {
    userSelection: {
      userSelection: null
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      userArticles: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    const categoryData = await request.fetchSelection({ query: localStorage.getItem('userCategory') });
    this.setState({
      userArticles: categoryData,
      loaded: true
    });
  }

  render() {
    const { userSelection: { userSelection }, header: { activateModal } } = this.props;
    const { userArticles, loaded } = this.state;
    const renderModal = !localStorage.getItem('userCategory') && !userSelection;
    return (
      <div>
        <Modal show={!!activateModal} />
        <HeroSection />
        {renderModal && <ModalSection /> }
        <CardContainer
          CardComponent={ArticleCard}
          cardData={userSelection || userArticles}
        />
        <ScrollToTopButton loaded={loaded} modalShow={!renderModal} />
      </div>
    );
  }
}

export default connect({ })(HomePage);
