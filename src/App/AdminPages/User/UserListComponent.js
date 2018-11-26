import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import adminActions from './../../../_actions/admin.actions';

import PaginationComponent from './../Components/PaginationComponent';

class UserListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };

        this.deleteUser = this.deleteUser.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.changePage = this.changePage.bind(this);

    }
    

    componentDidMount() {
        const {dispatch} = this.props;
        const {currentPage} = this.state;
        
        dispatch(adminActions.getUsers((currentPage-1)*10));
    }

    deleteUser(id) {
        const {dispatch, close} = this.props;

        dispatch(adminActions.deleteUser(id));
        close("editView", false);

    }

    setSelected(item) {
        const {dispatch, close} = this.props;

        dispatch(adminActions.updateUserState(item));

        close("editView", true);
    }

    changePage(change) {
        const {dispatch} = this.props;
        const {currentPage} = this.state;

        if (change >= 1) {
            this.setState({currentPage: change});
            dispatch(adminActions.getUsers((change-1)*10));
        }
        
    }

  render() {
    const { loading, users, userPages } = this.props;
    const { currentPage } = this.state;

    return (
        <div className="" >
            { loading && <em>loading</em>}
            { !loading && users && users.length == 0 && <em>No users</em>}
            { !loading && users && users.length>0 &&
                <div>
                    <ul className="list-group">

                        <li className="active list-group-item d-flex" >
                            <span className="mr-auto" >Name</span>
                            <span className="ml-auto mr-auto" >Email</span>
                            <span className="ml-auto mr-auto" >Verified</span>
                            <i class="ml-auto mt-auto mb-auto fas"></i>
                        </li>

                        { users.map(user =>
                            <li className="list-group-item d-flex">
                                <div className="w-100 d-flex cursor-pointer" onClick={() => this.setSelected(user)} >
                                    <span className="mr-auto" >{user.FirstName} {user.LastName}</span>
                                    <span className="ml-auto mr-auto" >{user.Email}</span>
                                    <span className="ml-auto mr-auto" >{ user.IsVerified ? <i class="fas fa-check-circle"></i> : ''}</span>
                                </div>
                                <i class="cursor-pointer ml-auto mt-auto mb-auto fas fa-times-circle" onClick={() => this.deleteUser(user.Id)}></i>

                            </li>)}
                    </ul>

                    <PaginationComponent currentPage={currentPage} pages={userPages} changePage={this.changePage} />

                </div>
            }
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    const { admin } = state;
    const { close } = ownProps;
    const { loading, users, userPages } = admin;

    return {
        loading, 
        users,
        userPages,
        close,
    };
}



export default connect(mapStateToProps)(UserListComponent);
