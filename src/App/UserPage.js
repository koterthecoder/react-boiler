import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class UserPage extends React.Component {


  render() {
    // const { players } = this.props;
    return (
      <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4">
        <h4>User</h4>

      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { players } = state;
  return {
    // players,
  };
}

// RosterPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   players: PropTypes.shape({ items: PropTypes.array, loading: PropTypes.bool }).isRequired,
// };


export default connect(mapStateToProps)(UserPage);
