import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userActions from '../_actions/user.actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);


    var today = new Date();

    var minAge = new Date();

    minAge.setFullYear(today.getFullYear()-13);


    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
        zip: '',
        password: '',
        confirm_password: '',
        
      },
      minimumAge: minAge,
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    this.setState({ submitted: true });
    const { user, minimumAge } = this.state;
    const { dispatch } = this.props;

    if (user.first_name && user.last_name && user.email && user.password
      && user.confirm_password && user.password === user.confirm_password
      && reg.test(user.password) && user.birthdate && user.zip && new Date(user.birthdate) < minimumAge) {
          dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted, minimumAge } = this.state;
    return (
    <div className="bg-theme-primary page-container col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-4 mb-4">
          <div className="ml-3 bg-t-primary" >
              <h2>Register</h2>

          </div>
          <div className=" mb-5 w-100 text-center d-flex">
              <div className="ml-auto mr-auto w-75">
                  Create an account to post, save your favorite things, and other free features
              </div>
          </div>
          <div className="d-flex">
              <form className="ml-auto mr-auto" name="form" onSubmit={this.handleSubmit}>
                <div className={`form-group${submitted && !user.first_name ? ' text-danger' : ''}`}>
                  <label htmlFor="first_name">First Name
                    <input type="text" className="form-control" id="firstName" name="first_name" value={user.first_name} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.first_name &&
                  <div className="help-block">First Name is required</div>}
                </div>
                <div className={`form-group${submitted && !user.last_name ? ' text-danger' : ''}`}>
                  <label htmlFor="last_name">Last Name
                    <input type="text" className="form-control" id="lastName" name="last_name" value={user.last_name} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.last_name &&
                  <div className="help-block">Last Name is required</div>}
                </div>
                <div className={`form-group${submitted && !user.email ? ' text-danger' : ''}`}>
                  <label htmlFor="email">Email
                    <input type="text" className="form-control" id="email" name="email" value={user.email} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.email &&
                  <div className="help-block">Email is required</div>}
                </div>
                <div className={`form-group${submitted && !user.zip ? ' text-danger' : ''}`}>
                  <label htmlFor="zip">Zip Code
                    <input type="text" className="form-control" id="zip" name="zip" value={user.zip} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.zip &&
                  <div className="help-block">Zip Code is required</div>}
                </div>
                <div className={`form-group${submitted && !user.birthdate ? ' text-danger' : ''}`}>
                  <label htmlFor="birthdate">Birthday
                    <input type="date" className="form-control" id="birthdate" name="birthdate" value={user.birthdate} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.birthdate &&
                      <div className="help-block">Birthday is required</div>}
                  {submitted && new Date(user.birthdate) > minimumAge &&
                      <div className="help-block">Must be at least 13 years of age</div>}
                </div>
                <div className={`form-group${submitted && !user.password ? ' text-danger' : ''}`}>
                  <label htmlFor="password">Password
                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.password &&
                  <div className="help-block">Password is required</div>}
                </div>
                <div className={`form-group${submitted && !user.confirm_password ? ' text-danger' : ''}`}>
                  <label htmlFor="confirm_password">Confirm Password
                    <input type="password" className="form-control" id="confirmPassword" name="confirm_password" value={user.confirm_password} onChange={this.handleChange} />
                  </label>
                  {submitted && !user.confirm_password &&
                  <div className="text-danger">Confirm Password is required</div>}
                  {submitted && !(/(?=.*\d)/).test(user.password) &&
                      <div className="help-block">Password must contain at least one number</div>}
                  {submitted && !(/(?=.*[a-z])/).test(user.password) &&
                      <div className="help-block">Password must contain at least one lowercase letter</div>}
                  {submitted && !(/(?=.*[A-Z])/).test(user.password) &&
                      <div className="help-block">Password must contain at least one uppercase letter</div>}
                  {submitted && !(/.{8,}/).test(user.password) &&
                      <div className="help-block">Password must contain at least 8 characters</div>}
                  {submitted && user.password !== user.confirm_password &&
                      <div className="help-block">Passwords must match</div>}

                </div>
                
                <div className="mt-5 text-center">
                  <label htmlFor="marketingEnroll"><input type="checkbox" name="marketingEnroll" id="marketingEnroll"
                    onChange={this.handleTncChange} /> Send me occasional updates about new features</label>
                    <br />
                    <br />
                  <label htmlFor="agreesToTNC"><input type="checkbox" name="agreesToTNC" id="agreesToTNC"
                    onChange={this.handleTncChange} /> I Agree to the <a href="/terms" target="_blank" >Terms and Conditions</a></label>
                </div>


                <div className="mt-3 mb-3 form-group">
                  <a href="/" className="mr-4 btn btn-secondary-brand">Cancel</a>
                  <button id="register" className="ml-4 btn btn-primary-brand">Register</button>

                </div>

          </form>
            </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

RegisterPage.defaultProps = {
  registering: false,
};

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registering: PropTypes.bool,
};


export default connect(mapStateToProps)(RegisterPage);
