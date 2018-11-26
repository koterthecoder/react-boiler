import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import userActions from './../_actions/user.actions';


class ResetPasswordPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            email: "",
            code: "",
            newPassword: "",
            confirmNewPassword: "",
        };

        this.renderEmailPage = this.renderEmailPage.bind(this);
        this.renderSendResetMessagePage = this.renderSendResetMessagePage.bind(this);
        this.renderSentEmailPage = this.renderSentEmailPage.bind(this);
        this.renderSentSmsPage = this.renderSentSmsPage.bind(this);
        this.renderResetPasswordPage = this.renderResetPasswordPage.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.submitEmail = this.submitEmail.bind(this);
        this.sendSms = this.sendSms.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.confirmChangePassword = this.confirmChangePassword.bind(this);
        
    }

    componentDidMount() {
        const {dispatch} = this.props;

        const urlParts = window.location.href.split('/');
        var postIndex = urlParts.indexOf("reset");
        const token = urlParts[postIndex+1];

        if (token !== undefined && token !== null && token !== "") {
            
            dispatch(userActions.verifyTokenForReset(token));
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    submitEmail() {
        const {dispatch} = this.props;
        const { email } = this.state;
        this.setState({submitted:true});
        if (email) {
            this.setState({submitted:false});
            dispatch(userActions.verifyEmailForReset(email));
        }
    }

    sendSms() {
        const {dispatch, UserId} = this.props;
        dispatch(userActions.sendResetCode(UserId));
    }

    sendEmail() {
        const {dispatch, UserId} = this.props;
        dispatch(userActions.sendResetEmail(UserId));
    }

    submitCode() {
        const {dispatch, UserId, Token} = this.props;
        const {code} = this.state;
        this.setState({submitted:true});

        if (code && code.length === 6) {
            dispatch(userActions.submitResetCode(UserId, code, Token));
            this.setState({submitted:false});
        }
    }

    confirmChangePassword() {
        const {dispatch, UserId, Token} = this.props;
        const {newPassword, confirmNewPassword} = this.state;

        var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        
        this.setState({submitted:true});
        if (newPassword && confirmNewPassword 
            && (newPassword === confirmNewPassword)
            && reg.test(newPassword) ) {
            var data = {
                Password: newPassword,
                ConfirmPassword: confirmNewPassword,
                UserId: UserId,
            };

            dispatch(userActions.updatePassword(data, Token));
            this.closeModal.click();
        }
    }


    renderEmailPage() {
        const { email, submitted } = this.state;
        return(
            <div>
                <div className={`form-group${submitted && !email ? ' text-danger' : ''}`}>
                    <label htmlFor="email">Enter Email or Username
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={this.handleChange} />
                    </label>
                    {submitted && !email &&
                    <div className="help-block">Email is required</div>}
                </div>
                <div className="form-group">
                    <label>
                        <button onClick={() => this.submitEmail()} className="btn btn-primary-brand">Submit</button>
                    </label>
                </div>
            </div>
        );
    }

    renderSendResetMessagePage() {
        const { email, submitted } = this.state;
        const { IsMobileNumberVerified } = this.props;
        return(
            <div>
                <p>Send Reset Password Message</p>
                { IsMobileNumberVerified &&
                <div className="form-group">
                    <label>
                        <button onClick={() => this.sendSms()} className="btn btn-primary-brand">Text Message</button>
                    </label>
                </div>}

                <div className="form-group">
                    <label>
                        <button onClick={() => this.sendEmail()} className="btn btn-primary-brand">Email</button>
                    </label>
                </div>
            </div>
        );
    }

    renderSentEmailPage() {

        return(
            <div>
                <p>Click on link in email to reset password</p>
            </div>
        );
    }

    renderSentSmsPage() {
        const { code, submitted } = this.state;
        return(
            <div>
                <p>Enter code sent to mobile phone</p>
                <div className={`form-group${submitted && !code ? ' text-danger' : ''}`}>
                    <label htmlFor="code">Reset Code
                    <input type="text" className="form-control" id="code" name="code" maxlength="6" value={code} onChange={this.handleChange} />
                    </label>
                    {submitted && !code &&
                    <div className="help-block">Code is required</div>}
                </div>
                <div className="form-group">
                    <label>
                        <button onClick={() => this.submitCode()} className="btn btn-primary-brand">Submit</button>
                    </label>
                </div>

            </div>
        );
    }


    renderResetPasswordPage() {
        const { newPassword, confirmNewPassword, submitted } = this.state;
        return(
            <div>
                <p>Enter new password</p>
                <div className={`form-group${submitted && !newPassword ? ' text-danger' : ''}`}>
                    <label htmlFor="newPassword">New Password
                    <input type="password" className="form-control" id="newPassword" name="newPassword" 
                        value={newPassword} onChange={this.handleChange} />
                    </label>
                    {submitted && !newPassword &&
                        <div className="help-block">New Password is required</div>}
                </div>
                <div className={`form-group${submitted && !confirmNewPassword ? ' text-danger' : ''}`}>
                    <label htmlFor="confirmNewPassword">Confirm New password
                    <input type="password" className="form-control" id="confirmNewPassword" name="confirmNewPassword" 
                        value={confirmNewPassword} onChange={this.handleChange} />
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
                <div class="form-group">
                    <label>
                        <button type="button" class="btn btn-primary-brand" onClick={() => this.confirmChangePassword()}>Update Password</button>
                    </label>
                </div>
            </div>
        );
    }




  render() {
    const { currentPage } = this.props;

    return (
      <div className="d-flex page-container col-md-12 col-lg-10 col-md-offset-1 mb-4">
            <div className="ml-auto mr-auto">
                <h2>Reset Password</h2>
                { currentPage === 0 && this.renderEmailPage() }
                { currentPage === 1 && this.renderSendResetMessagePage() }
                { currentPage === 2 && this.renderSentSmsPage() }
                { currentPage === 3 && this.renderSentEmailPage() }
                { currentPage === 4 && this.renderResetPasswordPage() }



                
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { reset } = state;
  const { currentPage, UserId, IsMobileNumberVerified, Token } = reset;
  return {
    currentPage,
    UserId, 
    IsMobileNumberVerified, 
    Token
  };
}

export default connect(mapStateToProps)(ResetPasswordPage);
