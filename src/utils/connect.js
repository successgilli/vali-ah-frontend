// third-party libraries
import { connect as connectRedux } from 'react-redux';
import { bindActionCreators } from 'redux';

const connect = (actions) => (Component) => {
  const mapStateToProps = (state) => ({ ...state });
  const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

  return connectRedux(mapStateToProps, mapDispatchToProps)(Component);
};

export default connect;
