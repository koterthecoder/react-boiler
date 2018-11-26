import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ErrorPage extends React.Component {

    constructor(props) {
      super(props);

      this.copyToClipboard = this.copyToClipboard.bind(this);
    }


    copyToClipboard() {
        this.inputUrl.select();
        document.execCommand('copy');
    }



  render() {
    const { code, message } = this.props;
    return (
      <div className="bg-t-quaternary w-100">
          <div className="w-100 bg-t-secondary text-center" >
              <div className="pt-4 pb-5">
                  <h1>Error {code}</h1>
              </div>
          </div>

          <div className="page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4 text-center">
            <div className="w-100 h-50 d-flex">
                <div className="w-50 m-auto text-center">
                    <h3 className="mb-5">{message}</h3>

                    
                </div>
            </div>
          </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state;
  const {code, message} = error;
  return {
        code,
        message,
  };
}



export default connect(mapStateToProps)(ErrorPage);
