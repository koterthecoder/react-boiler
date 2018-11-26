import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import SearchComponent from './../_components/SearchComponent';
import ImageComponent from './../_components/ImageComponent';


class LandingPage extends React.Component {

    constructor(props) {
        super(props);


    }

    componentDidMount() {
        const {dispatch} = this.props;


    }


  render() {  
      const {user, loading} = this.props;


    console.log(user);
    return(
    <div className="text-center">

        <div className={`${window.innerWidth > 480 && 'landing-hero'} d-flex bg-t-primary`}>
            <div className="m-auto">
                <div className="one-col-mobile ">

                    <div className="ml-auto mr-auto">
                        <div className="pt-3 pl-5 pr-5 pb-3 m-auto">
                            <h1 className="text-left mb-3">Find in your area</h1>
                            <p  className="text-left mr-auto">Enter a city, state or zip to start finding or.</p>

                        </div>
                    </div>

                    
                </div>
            </div>
        </div>

      <div className="mt-5 bg-t-quaternary d-flex" >
        <div className="mt-5 mb-5 text-white w-100 d-flex text-center">
            <span className="ml-auto mr-auto">Advertisement</span>
          </div>
      </div>


      <div className="bg-t-primary d-flex" >
        <div className="mt-5 mb-5">
            <div className="one-col-mobile">
                <div className="mt-5 ml-2 mr-2" >
                    <i class="fas fa-briefcase" style={{'font-size':'60px'}}></i>
                    <h5 className="mt-3 mb-3" >Natoque phasellus</h5>
                    Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.
                </div>
                <div className="mt-5 ml-2 mr-2" >
                    <i class="fas fa-code" style={{'font-size':'60px'}}></i>
                    <h5 className="mt-3 mb-3" >Ultricies dolore</h5>
                    Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.
                </div>
                <div className="mt-5 mb-5 ml-2 mr-2" >
                    <i class="far fa-save" style={{'font-size':'60px'}}></i>
                    <h5 className="mt-3 mb-3" >Magna lacinia</h5>
                    Ipsum dolor tempus commodo amet sed accumsan et adipiscing blandit porttitor sed faucibus.
                </div>
            </div>
          </div>
      </div>


    </div>);

  }
}


function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}


export default connect(mapStateToProps)(LandingPage);
