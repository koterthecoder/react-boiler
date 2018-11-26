import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import userActions from '../_actions/user.actions';


class FacebookLoginComponent extends React.PureComponent {


componentClicked() {
    console.log("component clicked");
  }

  
  responseFacebook(response) {
      if (response.status !== "not_authorized") {
            const { dispatch } = this.props;
            console.log(response);
            // alert(response);
            dispatch(userActions.loginWithFacebook(response));
      }
      else {
        alert("didnt work");
      }
  }
          // disableMobileRedirect={true}

  render() {

    return (
      <FacebookLogin
          appId="XXXXXXXXXXXXXX"
          autoLoad={false}
          scope="email"
          fields="name,email,picture"
          onClick={() => this.componentClicked}
          callback={(resp) => this.responseFacebook(resp)} />
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(FacebookLoginComponent);

