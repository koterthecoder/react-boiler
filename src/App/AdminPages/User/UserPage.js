import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Collapse} from 'react-collapse';
import { debounce } from 'throttle-debounce';

import alertActions from './../../../_actions/alert.actions';
import userActions from './../../../_actions/user.actions';
import adminActions from './../../../_actions/admin.actions';


import EditUserComponent from './EditUserComponent';
import UserListComponent from './UserListComponent';


class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            stateChanged: false,
            searchQuery: "",
            editView: false,
            itemCount: 10,
        };

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    searchUsers(event) {
        event.preventDefault();

        const {dispatch} = this.props;
        const {searchQuery, itemCount} = this.state;
        dispatch(adminActions.searchUsers(searchQuery, 0, itemCount));
    }

    toggle(item, state) {
        const {dispatch} = this.props;

        this.setState({[item]: state});
        if (!state) {
            dispatch(adminActions.updateUserState({
                Id: 0,
                FirstName: "",
                MiddleName: "",
                LastName: "",
                Birthdate: "",
                Gender: "",
                Address: "",
                City: "",
                State: "",
                Zip: "",
                Email: "",
                IsVerified: false,
                MobileNumber: "",
                IsMobileNumberVerified: false,
                IsTwoFactorEnabled: false,
                IsLockedOut: false,
                UserType: 0,
                LoginType: 1,
            }));
        }
    }



    render() {
        const { loading, users } = this.props;
        const { editView, searchQuery} = this.state;
        return(
            <div>

                <div className="d-flex" >
                    <Collapse className="w-100" isOpened={!editView} >
                        <div className="d-flex w-100">
                            <form  className="d-flex w-100" onSubmit={this.searchUsers} >
                            <div className="w-50 input-group mb-3">
                                <input className=" form-control" placeholder="Search by email" value={searchQuery} 
                                        name="searchQuery" onChange={this.handleChange} />

                                <div className="cursor-pointer input-group-append" >
                                    <button class="input-group-text" >
                                        <i className="fa fa-search"></i>
                                    </button>                                        
                                </div>
                            </div>
                            </form>
                            <div className="form-group ml-auto d-flex">
                                <div className=" mt-auto mb-auto btn btn-primary-brand" onClick={() => this.toggle("editView", true)}>
                                    <i class="fas fa-plus"></i> Add User</div>
                            </div>
                            
                            
                        </div>

                    </Collapse>
                </div>

                <Collapse isOpened={editView} >
                    <EditUserComponent close={this.toggle} />
                </Collapse>
                <UserListComponent  close={this.toggle}  />
            </div>);
    }
}

function mapStateToProps(state) {
    const { admin } = state;
    const { loading, users } = admin;

    return {
        loading, 
        users
    };
}



export default connect(mapStateToProps)(UserPage);
