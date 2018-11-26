import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userActions from './../_actions/user.actions';

class AboutUsPage extends React.Component {


    componentDidMount() {
      const {dispatch} = this.props;

      const urlParts = window.location.href.split('/');
      var postIndex = urlParts.indexOf("verify");
      const token = urlParts[postIndex+1]
      // console.log(token);
      dispatch(userActions.verifyUserEmail(token));
  }


  render() {
    return (
      <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4">
        <h4>Verify Account</h4>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}

export default connect(mapStateToProps)(AboutUsPage);
