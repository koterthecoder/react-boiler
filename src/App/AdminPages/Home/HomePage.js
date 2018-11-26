import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Collapse} from 'react-collapse';
import { debounce } from 'throttle-debounce';

import alertActions from './../../../_actions/alert.actions';
import userActions from './../../../_actions/user.actions';
import adminActions from './../../../_actions/admin.actions';



class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(adminActions.getHomeInfo());
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }



    render() {
        const { loading, homeDetails } = this.props;

        return(
            <div>

                { loading && <em>loading</em> }
                { !loading && 
                    <ul className="list-group" >
                        <li className="active list-group-item d-flex" >
                            <span className="mr-auto" >User Statistics</span>
                        </li>
                        <li className="list-group-item d-flex" >
                            <span className="mr-auto" >Total Users</span>
                            <span className="ml-auto" >{ homeDetails.TotalUsers }</span>
                        </li>
                        <li className="list-group-item d-flex" >
                            <span className="mr-auto" >Total Users Verified</span>
                            <span className="ml-auto" >{ homeDetails.TotalUsersVerified }</span>
                        </li>
                    </ul>}
                
            </div>);
    }
}

function mapStateToProps(state) {
    const { admin } = state;
    const { loading, homeDetails } = admin;

    return {
        loading, 
        homeDetails
    };
}



export default connect(mapStateToProps)(HomePage);
