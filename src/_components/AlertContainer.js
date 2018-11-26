import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import alertActions from './../_actions/alert.actions';

class AlertContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    this.clearAlert = this.clearAlert.bind(this);
  }

  clearAlert() {
      const {dispatch} = this.props;

      dispatch(alertActions.clear());
  }

  render() {
    const { alert } = this.props;
    return (
      <div className=" d-flex">
      
        {alert.message &&

          <div className={`alert-container w-100 ml-auto mr-auto d-flex alert ${alert.type}`}>

              <div className="ml-auto mr-auto">
                  {alert.message}
              </div>

              <span onClick={() => this.clearAlert()}>
                  <i class="fas fa-times"></i>
              </span>

          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

AlertContainer.propTypes = {
  alert: PropTypes.shape({}).isRequired,
};


export default connect(mapStateToProps)(AlertContainer);
