import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import alertActions from './../_actions/alert.actions';
import userActions from './../_actions/user.actions';


class MyAccountPage extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            submitted: false,
            twoFactorEnabled: false,
            stateChanged: false,
            newPassword: "",
            confirmNewPassword: "",
        };

        this.goToPage = this.goToPage.bind(this);

        this.renderGeneral = this.renderGeneral.bind(this);
        this.renderSecurity = this.renderSecurity.bind(this);


        this.handleUserAccountChange = this.handleUserAccountChange.bind(this);
        this.handleUserAccountDateChange = this.handleUserAccountDateChange.bind(this);
        this.handleUserAccountCheckChange = this.handleUserAccountCheckChange.bind(this);

        this.saveUserChanges = this.saveUserChanges.bind(this);
        this.cancelUserChanges = this.cancelUserChanges.bind(this);
        
        this.promptUserToAddMobile = this.promptUserToAddMobile.bind(this);

        this.handleStateChange = this.handleStateChange.bind(this);
        this.renderChangePasswordModal = this.renderChangePasswordModal.bind(this);
        this.confirmChangePassword = this.confirmChangePassword.bind(this);
    }

    componentDidMount() {
        const {dispatch, user} = this.props;


    }


    handleStateChange(event) {
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    confirmChangePassword() {
        const {dispatch, user} = this.props;
        const {newPassword, confirmNewPassword} = this.state;

        var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        
        this.setState({submitted:true});
        if (newPassword && confirmNewPassword 
            && (newPassword === confirmNewPassword)
            && reg.test(newPassword) ) {
            var data = {
                Password: newPassword,
                ConfirmPassword: confirmNewPassword,
                UserId: user.Id,
            };

            dispatch(userActions.updatePassword(data));
            this.closeModal.click();
        }

    }

    promptUserToAddMobile() {
        const {dispatch} = this.props;

        dispatch(alertActions.success("Add and verify a mobile number to enable Two-factor authentication"));
        this.setState({currentPage: 0});
    }

    handleUserAccountChange(event) {
        const {name, value} = event.target;
        const { dispatch, userAccount } = this.props;

        var newModel = {
            ...userAccount,
            [name]: value
        };
        dispatch(userActions.updateUserAccountState(newModel));
        this.setState({
            stateChanged: true
        });

    }

    handleUserAccountDateChange(event) {
        const {name, value} = event.target;
        const { dispatch, userAccount } = this.props;

        var newModel = {
            ...userAccount,
            [name]: value
        };
        dispatch(userActions.updateUserAccountState(newModel));
        this.setState({
            stateChanged: true
        });

    }

    handleUserAccountCheckChange(event) {
        const {name} = event.target;
        const { dispatch, userAccount } = this.props;

        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        var newModel = {
            ...userAccount,
            [name]: value
        };
        dispatch(userActions.updateUserAccountState(newModel));
        this.setState({
            stateChanged: true
        });

    }


    goToPage(page) {
        this.setState({currentPage: page});
    }


    saveUserChanges() {
        const { dispatch, userAccount } = this.props;
        dispatch(userActions.updateUser(userAccount));
        this.setState({stateChanged: false});
    }

    cancelUserChanges() {
        const { dispatch, user } = this.props;
        
        dispatch(userActions.updateUserAccountState(user));
        this.setState({stateChanged: false});
    }

    renderChangePasswordModal() {
        const { newPassword, confirmNewPassword, submitted } = this.state;
        return (
            <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className={`form-group${submitted && !newPassword ? ' text-danger' : ''}`}>
                            <label htmlFor="newPassword">New Password
                            <input type="password" className="form-control" id="newPassword" name="newPassword" 
                                value={newPassword} onChange={this.handleStateChange} />
                            </label>
                            {submitted && !newPassword &&
                                <div className="help-block">New Password is required</div>}
                        </div>
                        <div className={`form-group${submitted && !confirmNewPassword ? ' text-danger' : ''}`}>
                            <label htmlFor="confirmNewPassword">Confirm New password
                            <input type="password" className="form-control" id="confirmNewPassword" name="confirmNewPassword" 
                                value={confirmNewPassword} onChange={this.handleStateChange} />
                            </label>
                            {submitted && !confirmNewPassword &&
                                <div className="help-block">Confirm New password is required</div>}
                        </div>
                        <div className={`form-group${submitted && !confirmNewPassword ? ' text-danger' : ''}`}>
                            {submitted && !(/(?=.*\d)/).test(newPassword) &&
                                <div className="help-block">Password must contain at least one number</div>}
                            {submitted && !(/(?=.*[a-z])/).test(newPassword) &&
                                <div className="help-block">Password must contain at least one lowercase letter</div>}
                            {submitted && !(/(?=.*[A-Z])/).test(newPassword) &&
                                <div className="help-block">Password must contain at least one uppercase letter</div>}
                            {submitted && !(/.{8,}/).test(newPassword) &&
                                <div className="help-block">Password must contain at least 8 characters</div>}
                            {submitted && newPassword !== confirmNewPassword &&
                                <div className="help-block">Passwords must match</div>}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" ref={closeModal => this.closeModal = closeModal}  data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary-brand" onClick={() => this.confirmChangePassword()}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }


    renderGeneral() {
        const { submitted } = this.state;
        const { userAccount } = this.props;

        return(
            <div>
                <h5>Personal</h5>
                <div className={`form-group${submitted && !userAccount.FirstName ? ' text-danger' : ''}`}>
                    <label htmlFor="FirstName">First Name
                    <input type="text" className="form-control" id="FirstName" name="FirstName" value={userAccount.FirstName} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.FirstName &&
                    <div className="help-block">First Name is required</div>}
                </div>
                <div className={`form-group${submitted && !userAccount.MiddleName ? ' text-danger' : ''}`}>
                    <label htmlFor="MiddleName">Middle Name
                    <input type="text" className="form-control" id="MiddleName" name="MiddleName" value={userAccount.MiddleName} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.MiddleName &&
                    <div className="help-block">Middle Name is required</div>}
                </div>   
                <div className={`form-group${submitted && !userAccount.LastName ? ' text-danger' : ''}`}>
                    <label htmlFor="LastName">Last Name
                    <input type="text" className="form-control" id="LastName" name="LastName" value={userAccount.LastName} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.LastName &&
                    <div className="help-block">Last Name is required</div>}
                </div>  
                <div className={`form-group${submitted && !userAccount.Birthdate ? ' text-danger' : ''}`}>
                    <label >Birthdate
                        <input type="date" className="form-control" id="Birthdate" name="Birthdate" 
                        value={moment(userAccount.Birthdate).format("YYYY-MM-DD")} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.Birthdate &&
                    <div className="help-block">Birthdate is required</div>}
                </div> 


                <h5 className="mt-4" >Address</h5>
                <div className={`form-group${submitted && !userAccount.Address ? ' text-danger' : ''}`}>
                    <label htmlFor="Address">Address
                    <input type="text" className="form-control" id="Address" name="Address" value={userAccount.Address} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.Address &&
                    <div className="help-block">Address is required</div>}
                </div> 
                <div className={`form-group${submitted && !userAccount.City ? ' text-danger' : ''}`}>
                    <label htmlFor="City">City
                    <input type="text" className="form-control" id="City" name="City" value={userAccount.City} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.City &&
                    <div className="help-block">City is required</div>}
                </div> 
                <div className={`form-group${submitted && !userAccount.State ? ' text-danger' : ''}`}>
                    <label htmlFor="State">State
                    <input type="text" className="form-control" id="State" name="State" value={userAccount.State} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.State &&
                    <div className="help-block">State is required</div>}
                </div> 
                <div className={`form-group${submitted && !userAccount.Zip ? ' text-danger' : ''}`}>
                    <label htmlFor="Zip">Zip
                    <input type="text" className="form-control" id="Zip" name="Zip" value={userAccount.Zip} onChange={this.handleUserAccountChange} />
                    </label>
                    {submitted && !userAccount.Zip &&
                    <div className="help-block">Zip is required</div>}
                </div> 


                <h5 className="mt-4" >Contact</h5>
                <div className={`form-group${submitted && !userAccount.Email ? ' text-danger' : ''}`}>
                    <label htmlFor="Email">Email 
                    <input type="text" className="form-control" id="Email" name="Email" value={userAccount.Email} onChange={this.handleUserAccountChange} />
                    { userAccount.IsVerified && <span><i class="far fa-check-circle"></i> Verified</span> }
                    </label>
                    {submitted && !userAccount.Email &&
                    <div className="help-block">Email is required</div>}
                </div> 
                <div className={`form-group${submitted && !userAccount.MobileNumber ? ' text-danger' : ''}`}>
                    <label htmlFor="MobileNumber">Mobile Number 
                    <input type="text" className="form-control" id="MobileNumber" name="MobileNumber" value={userAccount.MobileNumber} 
                            onChange={this.handleUserAccountChange} placeholder="5555555555" maxlength="10" />
                    { userAccount.IsMobileNumberVerified && <span><i class="far fa-check-circle"></i> Verified</span> }
                    </label>
                    {submitted && !userAccount.MobileNumber &&
                    <div className="help-block">Mobile Number (with area code) is required</div>}
                </div> 




          </div>
        );
    }
    renderSecurity() {
        const { submitted, twoFactorEnabled } = this.state;
        const { userAccount, user } = this.props;
        // console.log(user);
        return(
            <div>
                <h5><i class="fas fa-key"></i> Login Credentials</h5>
                <div className="mr=3">
                    { userAccount.LoginType === 1 &&
                    <span>
                        <button className="btn btn-secondary" data-toggle="modal" data-target="#changePasswordModal">
                            Change Password
                        </button>
                        { this.renderChangePasswordModal() }
                    </span>}
                    { userAccount.LoginType === 2 &&
                    <span>
                        Login credentials are managed by Facebook
                    </span>}
                </div>

                <h5 className="mt-5"><i class="fas fa-shield-alt"></i> Two Factor</h5>

                { !userAccount.IsMobileNumberVerified &&
                    <button className="btn btn-secondary" onClick={() => this.promptUserToAddMobile()} >
                        Verify Mobile Number
                    </button>}
                { userAccount.IsMobileNumberVerified && 
                <label class="switch mb-auto mt-auto">
                    <input type="checkbox" name="IsTwoFactorEnabled" checked={userAccount.IsTwoFactorEnabled} onChange={this.handleUserAccountCheckChange} />
                    <span class="slider round"></span>
                    

                </label>}

            </div>
        );
    }

  render() {
    const { currentPage, stateChanged } = this.state;

    return (
    <div className="w-100">
        <div className="w-100 text-center" >
              <div className="pt-4 ">
                <div className="btn-group mb-3">
                    <button className={`btn btn-secondary-brand ${currentPage===0 ? 'active' : 'cursor-pointer' }`} 
                        onClick={() => this.goToPage(0)} >General</button>
                    <button className={`btn btn-secondary-brand ${currentPage===1 ? 'active' : 'cursor-pointer' }`} 
                        onClick={() => this.goToPage(1)} >Security</button>
                </div>

              </div>
          </div>

      <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4" >
        <div className="d-flex">
            <div className="d-initial ml-auto mr-auto">

                

                { currentPage===0 &&
                    this.renderGeneral() }
                { currentPage===1 &&
                    this.renderSecurity() }
                { stateChanged && 
                    <div className="d-flex mt-5 ml-auto mr-auto " >
                        <button onClick={() => this.saveUserChanges()} className="mr-5 btn btn-primary-brand">Save</button>
                        <button onClick={() => this.cancelUserChanges()} className="ml-5 btn btn-secondary">Cancel</button>
                    </div>}

            </div>
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { account, authentication } = state;
  const { userAccount } = account;
  const { user } = authentication;
  return {
    userAccount,
    user,

  };
}

export default connect(mapStateToProps)(MyAccountPage);
