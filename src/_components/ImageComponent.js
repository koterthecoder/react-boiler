import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import blogDefaultImage from './../images/blog.png';
import marketImage from './../images/market.png';
import garageImage from './../images/garage.png';


class ImageComponent extends React.PureComponent {
    render() {
        const { url, classes, type } = this.props;


        if (url === undefined || url === null || url === "" || url === false) {
        console.log(url);
            switch(type) {
                case "user":
                    return (
                        <div className={`${classes} rounded image-width d-flex bg-t-secondary`} onClick={this.props.onClick}>
                            <img className="m-auto image-white" src={blogDefaultImage} />
                        </div>
                    );
                default:
                    return (
                        <div className={`${classes} rounded image-width d-flex bg-t-secondary`} onClick={this.props.onClick}>
                        </div>
                    );
            }
        }
        else {
            return (
                <div className={`${classes} rounded image-width`} 
                    style={{'background-image':`url(${url})`}} onClick={this.props.onClick}>
                </div>
            )
        }        
    }
}

function mapStateToProps(state, ownProps) {
    const {url, classes, type} = ownProps;
  return {
      url, 
      classes, 
      type,
  };
}

export default connect(mapStateToProps)(ImageComponent);
