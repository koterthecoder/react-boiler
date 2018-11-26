import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PageLoadingScreen extends React.PureComponent {
  render() {
    const { isLoading } = this.props;
    return (
      <div className={`${isLoading ? 'loading-screen' : 'no-loading-screen' }`}>
        <i class="fas fa-spinner"></i>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state;
  const { isLoading } = loading;
  return {
    isLoading,
  };
}



export default connect(mapStateToProps)(PageLoadingScreen);
