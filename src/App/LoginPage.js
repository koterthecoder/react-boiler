import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import FacebookLogin from 'react-facebook-login';

import userActions from '../_actions/user.actions';

import FacebookLoginComponent from './../_components/FacebookLoginComponent';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.loggedIn) {
      this.props.dispatch(userActions.logout());
    }

    this.state = {
      submitted: false,
      email: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.goToResetPasswordPage = this.goToResetPasswordPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }






  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  goToResetPasswordPage() {
      const {dispatch} = this.props;

      dispatch(userActions.goToResetPasswordPage());
  }


  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (

    <div className="bg-theme-primary page-container col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-4 mb-4">
          <div className="ml-3 bg-t-primary" >
              <h2>Login</h2>

          </div>
          <div className="one-col-mobile">
              <div className="p-5 w-100 d-flex" >
                  <div className="ml-auto mr-auto" style={{'width':'230px'}} >
                      <form className="w-100" name="form" onSubmit={this.handleSubmit}>
                          <div className={`form-group${submitted && !email ? ' text-danger' : ''}`}>
                            <label className="w-100"  htmlFor="email">Email
                              <input type="text" className="form-control" id="email" name="email" value={email} onChange={this.handleChange} />
                            </label>
                            {submitted && !email &&
                            <div className="help-block">Email is required</div>
                                        }
                          </div>
                          <div className={`form-group${submitted && !password ? ' text-danger' : ''}`}>
                            <label className="w-100"  htmlFor="password">Password
                              <input type="password" className="form-control" id="password" name="password" value={password} onChange={this.handleChange} />
                            </label>
                            {submitted && !password &&
                            <div className="help-block">Password is required</div>
                                        }
                          </div>
                          <div className="form-group">
                              <label className="w-100" ><button id="login" className="w-100 btn btn-secondary-brand">Login</button></label>
                          </div>
                      </form>



                    <div className="form-group">
                      <label className="w-100"  ><FacebookLoginComponent /></label>
                    </div>


                    <div className="form-group">
                      <label  className="w-100" ><button className="w-100 btn btn-primary-brand" onClick={() => this.goToResetPasswordPage()} >Forgot Password?</button></label>
                    </div>
                  </div>
              </div>
              <div className="p-5 w-100" >
                  <div className="m-auto text-center">
                      <h4 >Don't have an account?</h4>
                      <h4>Sign up!</h4>
                      <div className="mt-3 form-group">
                          <label><a href="/register" className="w-100 btn btn-primary-brand">Sign Up</a></label>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggedIn } = state.authentication;
  return {
    loggingIn,
    loggedIn,
  };
}

LoginPage.defaultProps = {
  loggingIn: false,
  loggedIn: false,
};

LoginPage.propTypes = {
  loggingIn: PropTypes.bool,
  loggedIn: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(LoginPage);
