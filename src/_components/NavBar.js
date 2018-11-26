import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userActions from '../_actions/user.actions';
import history from './../_helpers/history';

import SiteUrls from './../_helpers/site-urls';


class NavBar extends React.PureComponent {


  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

UserDropdown(user) {
  return (
    <li className="nav-item dropdown">
        <a href="/">LOGO</a>

      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        
          <div className="d-flex initial-circle rounded-circle">
            <span className="m-auto">
              {user.first_name.substring(0, 1).toLowerCase()}
              {user.last_name.substring(0, 1).toLowerCase()}
            </span>
          </div>
        
        
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">


        <div className="dropdown-divider"></div>
        <a href="/login" className="dropdown-item" >Logout</a>
      </div>
    </li>
  );
}


UserIsConsumer(user) {
  const {title} = this.props;

  return (
    <nav className="col-md-12 col-lg-8 col-md-offset-2  ml-auto mr-auto navbar navbar-light  navbar-expand-lg ">
        
        <a href="/">LOGO</a>

        <h4 className="text-tertiary mb-0" >
            {title}
            </h4>
      <button className="ml-auto navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">


          <li className="bg-dark nav-item active d-flex">
              <div class="dropdown show ml-auto">
                <a class="d-flex border-none btn btn-primary-brand dropdown-toggle" href="#" role="button" id="aboutMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  About Us  <i class="ml-2 mt-auto mb-auto fas fa-caret-down"></i>
                </a>

                <div class="dropdown-menu" aria-labelledby="aboutMenuLink">
                  <a class="dropdown-item" href="/contact">Contact Us</a>
                </div>
              </div>
          </li>

          <li className="bg-dark nav-item active d-flex">
              <div class="dropdown show ml-auto">
                <a class="d-flex border-none btn btn-primary-brand dropdown-toggle" href="#" role="button" id="userMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {user.FirstName}  <i class="ml-2 mt-auto mb-auto fas fa-caret-down"></i>
                </a>

                <div class=" dropdown-menu" aria-labelledby="userMenuLink">
                  { user.UserType === 1 && <a class="dropdown-item" href="/admin"><i class="fas fa-wrench"></i> Admin</a>}
                  <a class="dropdown-item" href="/account"><i className="fas fa-user"></i> Account</a>
                  <a class="dropdown-item" href="/login"><i class="fas fa-sign-out-alt"></i> Logout</a>

                </div>
              </div>
          </li>
                    
          
        </ul>
      </div>
    </nav>
  );
}

UserIsNull() {
  const {title} = this.props;
  return (
    <nav className="col-md-12 col-lg-8 col-md-offset-2  ml-auto mr-auto navbar navbar-light navbar-expand-lg ">
        <a href="/">LOGO</a>
      <button className="ml-auto navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">

          <li className="nav-item active d-flex">
              <div class="dropdown show ml-auto">
                <a class="d-flex border-none btn btn-primary-brand dropdown-toggle" href="#" role="button" id="fleaMarketMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  About Us  <i class="ml-2 mt-auto mb-auto fas fa-caret-down"></i>
                </a>

                <div class="dropdown-menu" aria-labelledby="fleaMarketMenuLink">
                  <a class="dropdown-item" href="/contact">Contact Us</a>

                </div>
              </div>
          </li>

          <li className="text-tertiary nav-item active d-flex">
              <div class="dropdown show ml-auto">
                  <a class="ml-auto dropdown-item" href="/login">Sign In</a>
              </div>
          </li>
                    
          
        </ul>
      </div>
    </nav>
  );
}



  render() {
    const { loggedIn, user } = this.props;

    if (loggedIn) {
      return this.UserIsConsumer(user);
    }
    else {
      return this.UserIsNull();
    }
  }
}

function mapStateToProps(state) {
  const { authentication, header } = state;
  const { loggedIn, user } = authentication;
  const { title } = header;

  return {
    loggedIn,
    user,
    title,
  };
}

// NavBar.defaultProps = {
//   loggedIn: false,
// };

// NavBar.propTypes = {
//   loggedIn: PropTypes.bool,
// };


export default connect(mapStateToProps)(NavBar);
