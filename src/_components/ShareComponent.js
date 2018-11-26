import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SiteUrls from './../_helpers/site-urls';

class ShareComponent extends React.PureComponent {

    constructor(props) {
        super(props);

        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.goToSharingLink = this.goToSharingLink.bind(this);
    }


    copyToClipboard() {
        this.inputUrl.select();
        document.execCommand('copy');
    }

    goToSharingLink(link) {
        window.open(link);
    }


  render() {
    const { itemType, itemId } = this.props;

    var shareUrl = SiteUrls.Base;
    var shareDescription = "";

    
    switch (itemType) {
        case "blog":
            shareUrl += `blog/${itemId}`;
            shareDescription = "Share this blog by Url or on Facbook or Twitter";
            break;
        default:
            break;

    }

    var facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;


    return (
        <span>
            <i className="cursor-pointer fas fa-share-alt" data-toggle="modal" data-target="#shareModal" ></i>

            <div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="shareModalLabel">Share</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {shareDescription}

                    <div class="input-group mt-3 mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">URL</span>
                        </div>
                        <input type="text" value={shareUrl} class="form-control" ref={(inputUrl) => this.inputUrl = inputUrl} />
                        <div class="input-group-append">
                            <button class="input-group-text" onClick={() => this.copyToClipboard()} ><i class="far fa-clone"></i></button>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="m-auto text-center">
                            <div onClick={() => this.goToSharingLink(facebookShare)}
                                className="cursor-pointer d-flex ml-auto mr-auto initial-circle rounded-circle">
                                <span className="m-auto">
                                    <i class="fab fa-facebook-f"></i>
                                </span>
                            </div>
                            Facebook
                        </div>
                        <div className="m-auto text-center">
                            <div className="d-flex ml-auto mr-auto initial-circle rounded-circle">
                                <span className="m-auto">
                                    <i class="fab fa-twitter"></i>
                                </span>
                            </div>
                            Twitter
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </span>    
    );
  }
}

function mapStateToProps(state, ownProps) {
    const {itemType, itemId} = ownProps;
  return {
      itemType, 
      itemId
  };
}

export default connect(mapStateToProps)(ShareComponent);
