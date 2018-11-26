import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import adminActions from './../../../_actions/admin.actions';
import userActions from './../../../_actions/user.actions';


class EditUserComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            stateChanged: true,
        };
        
        this.saveUser = this.saveUser.bind(this);
        this.changed = this.changed.bind(this);
        this.updateUserState = this.updateUserState.bind(this);
        this.updateCheckedUserState = this.updateCheckedUserState.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

        
    }

    changed() {
        this.setState({stateChanged:true});
    }

    sendEmail(userId) {
        const {dispatch} = this.props;

        dispatch(userActions.sendResetEmail(userId));
    }


    updateUserState(event) {
        const {dispatch, selectedUser} = this.props;
        const {name, value} = event.target;


        var newModel = {
            ...selectedUser,
            [name]: value,
        };
        dispatch(adminActions.updateUserState(newModel));
    }

    updateCheckedUserState(event) {
        const {dispatch, selectedUser} = this.props;
        const {name} = event.target;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;


        var newModel = {
            ...selectedUser,
            [name]: value,
        };
        dispatch(adminActions.updateUserState(newModel));
    }

    saveUser() {
        const {dispatch, selectedUser, close} = this.props;

        this.setState({submitted: true});

        dispatch(adminActions.saveUser(selectedUser));
        close("editView", false);
    }

    render() {
        const { selectedUser, close } = this.props;
        const { submitted } = this.state;

        // console.log(selectedUser);
        
        return (
            <div className="pb-5" >
                { selectedUser && selectedUser.Id === 0  &&
                    <h5>Add User</h5> }
                { selectedUser && selectedUser.Id > 0  &&
                <h5>Edit User (Id: {selectedUser.Id})</h5> }

                <div className="d-flex">
                    <div className="ml-auto mr-auto" >
                        <h5 className="mt-4" >Personal</h5>
                        <div className="form-group">
                            <label htmlFor="FirstName">First Name
                                <input type="text" className="form-control" id="FirstName" name="FirstName" value={selectedUser.FirstName} onChange={this.updateUserState} />
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="MiddleName">Middle Name
                            <input type="text" className="form-control" id="MiddleName" name="MiddleName" value={selectedUser.MiddleName} onChange={this.updateUserState} />
                            </label>
                        </div>   

                        <div className="form-group">
                            <label htmlFor="LastName">Last Name
                            <input type="text" className="form-control" id="LastName" name="LastName" value={selectedUser.LastName} onChange={this.updateUserState} />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label >Birthdate
                                <input type="date" className="form-control" id="Birthdate" name="Birthdate" 
                                value={moment(selectedUser.Birthdate).format("YYYY-MM-DD")} onChange={this.updateUserState} />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="Gender" >
                                Gender
                                <select onChange={this.updateUserState} value={selectedUser.Gender} name="Gender" className="form-control">
                                    <option value={0}>Not Specified</option>
                                    <option value={1}>Male</option>
                                    <option value={2}>Female</option>
                                </select>
                            </label>
                        </div>

                        <h5 className="mt-4" >Address</h5>
                        <div className="form-group">
                            <label htmlFor="Address">Address
                            <input type="text" className="form-control" id="Address" name="Address" value={selectedUser.Address} onChange={this.updateUserState} />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="City">City
                            <input type="text" className="form-control" id="City" name="City" value={selectedUser.City} onChange={this.updateUserState} />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="State">State
                            <input type="text" className="form-control" id="State" name="State" value={selectedUser.State} onChange={this.updateUserState} />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="Zip">Zip
                                <input type="text" className="form-control" id="Zip" name="Zip" value={selectedUser.Zip} onChange={this.updateUserState} />
                            </label>
                        </div> 
                    </div>

                    <div className="ml-auto mr-auto" >
                        <h5 className="mt-4" >Contact</h5>
                        <div className="form-group">
                            <label htmlFor="Email">Email 
                                <input type="text" className="form-control" id="Email" name="Email" value={selectedUser.Email} onChange={this.updateUserState} />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="IsVerified" >
                                Is Verified
                                <input type="checkbox" onChange={this.updateCheckedUserState} id="IsVerified" 
                                    name="IsVerified" checked={selectedUser.IsVerified} className="ml-3" /> 
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="MobileNumber">Mobile Number 
                                <input type="text" className="form-control" id="MobileNumber" name="MobileNumber" value={selectedUser.MobileNumber} 
                                        onChange={this.updateUserState} placeholder="(555) 555 5555" maxlength="10" />
                            </label>
                        </div> 

                        <div className="form-group">
                            <label htmlFor="IsMobileNumberVerified" >
                                Is Mobile Number Verified
                                <input type="checkbox" onChange={this.updateCheckedUserState} id="IsMobileNumberVerified" 
                                    name="IsMobileNumberVerified" checked={selectedUser.IsMobileNumberVerified} className="ml-3" /> 
                            </label>
                        </div>

                        <h5 className="mt-4" >Admin</h5>
                        <div className="form-group">
                            <label htmlFor="IsTwoFactorEnabled" >
                                Two Factor
                                <input type="checkbox" onChange={this.updateCheckedUserState} id="IsTwoFactorEnabled" 
                                    name="IsTwoFactorEnabled" checked={selectedUser.IsTwoFactorEnabled} className="ml-3" /> 
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="IsLockedOut" >
                                IsLockedOut
                                <input type="checkbox" onChange={this.updateCheckedUserState} id="IsLockedOut" 
                                    name="IsLockedOut" checked={selectedUser.IsLockedOut} className="ml-3" /> 
                            </label>
                        </div>


                        <div className="form-group">
                            <label htmlFor="UserType" >
                                User Type
                                <select onChange={this.updateUserState} name="UserType" value={selectedUser.UserType} className="form-control">
                                    <option selected value={0}>Regular</option>
                                    <option value={1}>Administrator</option>
                                </select>
                            </label>
                        </div>

                        { selectedUser && selectedUser.Id > 0 && 
                            <div className="form-group">
                                <label htmlFor="LoginType" >
                                    Login Type
                                    <span>
                                        { selectedUser.LoginType == 1 && <span>Standard</span>}
                                        { selectedUser.LoginType == 2 && <span>Facebook</span>}
                                    </span>
                                </label>
                            </div>}
                            
                        { selectedUser && selectedUser.Id > 0 && 
                            <div className="form-group">
                                <label htmlFor="LoginType" >
                                    Reset Password
                                    <button className="btn btn-primary-brand" onClick={() => this.sendEmail(selectedUser.Id)}>Send Email</button>
                                </label>
                            </div>}
                    </div>
                </div>

            
                <div className="d-flex">
                    <button className="mr-5 btn btn-secondary" onClick={() => close("editView", false)}>Cancel</button>
                    <button className="ml-auto btn btn-primary-brand" onClick={() => this.saveUser()}>Save</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { admin } = state;
    const { close } = ownProps;
    const { selectedUser } = admin;

    return {
        selectedUser,
        close
    };
}



export default connect(mapStateToProps)(EditUserComponent);
