import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ImageComponent from './../_components/ImageComponent';


class ContactUsPage extends React.Component {


  render() {
    // const { players } = this.props;
    return (
      <div className="w-100">



            <div className="text-center page-container col-md-10 col-md-offset-1 col-lg-8 col-md-offset-2 mb-4">
                <div className="w-100  h-50 ">
                    <div className="mt-5 one-col-tablet" style={{'font-size':'20px'}}>
                        <div className=" m-auto d-flex pb-5" >
                            <i class="fas fa-envelope mr-4"></i>
                            <div>
                                support@site.com
                            </div>
                        </div>
                        <div className="m-auto d-flex" >
                            <i class="fas fa-map-marker-alt  mr-4"></i>
                            <div>
                                site.com <br />
                                974 Paradrome St Apt C <br />
                                Cincinnati, OH 45202 <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { players } = state;
  return {
    // players,
  };
}

// RosterPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   players: PropTypes.shape({ items: PropTypes.array, loading: PropTypes.bool }).isRequired,
// };


export default connect(mapStateToProps)(ContactUsPage);
