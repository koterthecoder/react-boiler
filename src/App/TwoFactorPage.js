import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';

import userActions from './../_actions/user.actions';

class TwoFactorPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            twoFactorCode: ""
        };

        this.handleChange = this.handleChange.bind(this);

        this.renderer = this.renderer.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.resendCode = this.resendCode.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({[name]:value});
    }

    submitCode() {
        const { user, dispatch } = this.props;
        const { twoFactorCode } = this.state;
        let newModel = user;
        // console.log(twoFactorCode);
        newModel.TwoFactor.Code = twoFactorCode;
        // console.log(newModel);
        dispatch(userActions.submitTwoFactor(newModel));
    }

    resendCode() {
        const { user, dispatch } = this.props;
        dispatch(userActions.resendTwoFactor(user));

    }


  renderer({ hours, minutes, seconds, completed }) {
        const { twoFactorCode } = this.state;
        if (completed) {
            return (
                <div>
                    <p>Token is expired</p>
                    <button onClick={() => this.resendCode()} className="btn btn-primary-brand">Resend Code</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Code Expires In: {minutes}:{seconds}</p>
                    <p>Enter Code Sent To Your Phone</p>
                    <label className="mb-3">
                        <input type="text" onChange={this.handleChange} name="twoFactorCode" value={twoFactorCode} className="form-control" />
                    </label>
                    <button onClick={() => this.submitCode()} className="btn btn-primary-brand">Submit</button>
                    <button onClick={() => this.resendCode()} className="ml-3 btn btn-secondary">Resend Code</button>
                </div>
            );
        }
  };

  render() {
    const { user } = this.props;
    if (user && user.TwoFactor && user.TwoFactor.Verification) {
        return (
            <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4">
                <h4>Mobile Number Verification</h4>
                <div>
                    <Countdown date={user.TwoFactor.Expiration} renderer={this.renderer} />
                </div>
            </div>
        );
    }
    else if (user && user.TwoFactor && user.TwoFactor.Authorization) {
        return (
            <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4">
                <h4>Two Factor Authentication</h4>
                <div>
                    <Countdown date={user.TwoFactor.Expiration} renderer={this.renderer} />
                </div>
            </div>
        );
    }
    return (
      <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4">
        <h4>Two Factor</h4>
        <button className="btn btn-primary-brand" onClick={() => location.reload()} >Retry</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}



export default connect(mapStateToProps)(TwoFactorPage);
