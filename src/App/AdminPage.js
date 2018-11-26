import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {Collapse} from 'react-collapse';

import alertActions from './../_actions/alert.actions';
import userActions from './../_actions/user.actions';
import adminActions from './../_actions/admin.actions';

import HomePage from './AdminPages/Home/HomePage';
import UserPage from './AdminPages/User/UserPage';




class AdminPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            submitted: false,
            stateChanged: false,
        };

        this.goToPage = this.goToPage.bind(this);

        this.renderDetailPage = this.renderDetailPage.bind(this);
        
        this.toggle = this.toggle.bind(this);
    }

    goToPage(page) {
        this.setState({currentPage: page});
    }

    toggle(item, state) {
        this.setState({[item]: state});
    }





    renderDetailPage() {
        const { currentPage } = this.state;
        switch(currentPage) {
            case 0:
                return <HomePage />;
            case 1:
                return <UserPage />;
            case 2:
            default:
                return <HomePage />;
        }
    }

    render() {
        const { currentPage, stateChanged } = this.state;

        return (
            <div className="w-100">


                <div className="w-100 bg-t-tertiary text-center mb-3" >
                    <div className="pt-1">
                        <h2>Administration</h2>


                        <div className="btn-group mt-1 mb-3 ">
                            <button className={`btn btn-light ${currentPage===0 ? 'active' : 'cursor-pointer' }`} 
                                onClick={() => this.goToPage(0)} >Home</button>
                            <button className={`btn btn-light ${currentPage===1 ? 'active' : 'cursor-pointer' }`} 
                                onClick={() => this.goToPage(1)} >Users</button>

                        </div>



                    </div>
                </div>

            <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4" >
                <div className="d-flex">
                    <div className="w-100 d-initial ml-auto mr-auto">
                        
                        
                        
                        { this.renderDetailPage() }

                    </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  const { account, authentication, admin } = state;
  const { userAccount } = account;
  const { user } = authentication;

  return {
    userAccount,
    user,
  };
}



export default connect(mapStateToProps)(AdminPage);
