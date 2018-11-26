import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';




const FooterComponent = () => (
  <div className="bg-t-quaternary footer-component">

    <div className="social-media container d-flex">

        <div className="ml-auto mr-auto d-flex">
            <div className="social-item text-center">
                <div className="d-flex ml-auto mr-auto initial-circle rounded-circle" onClick={() => window.location.replace("http://www.Facebook.com/")}>
                    <span className="m-auto">
                        <i class="fab fa-facebook-f"></i>
                    </span>
                </div>
                <span className="social-name" >Facebook</span>
            </div>
            <div className="social-item text-center">
                <div className="d-flex ml-auto mr-auto initial-circle rounded-circle" onClick={() => window.location.replace("http://www.YouTube.com/")}>
                    <span className="m-auto">
                        <i class="fab fa-youtube"></i>
                    </span>
                </div>
                <span className="social-name" >Youtube</span>
            </div>

            <div className="social-item text-center">
                <div className="d-flex ml-auto mr-auto initial-circle rounded-circle" onClick={() => window.location.replace("http://www.Twitter.com/")}>
                    <span className="m-auto">
                        <i class="fab fa-twitter"></i>
                    </span>
                </div>
                <span className="social-name" >Twitter</span>
            </div>
            <div className="social-item text-center">
                <div className="d-flex ml-auto mr-auto initial-circle rounded-circle" onClick={() => window.location.replace("https://www.linkedin.com/")}>
                    <span className="m-auto">
                        <i class="fab fa-linkedin-in"></i>
                    </span>
                </div>
                <span className="social-name" >LinkedIn</span>
            </div>
        </div>

    </div>
    <div className="d-flex">
        <div className="ml-auto mr-auto" >
            <div className="one-col-mobile  ">
                <div className="d-flex mb-3 ">

                    <div className="d-flex ml-3 mr-3">
                        <span className="">
                            <br /><a href="/sale">Search</a>
                            <br /><a href="/post">Post</a>
                        </span>
                    </div>

                    <div className="d-flex ml-3 mr-3">
                        <span className="">
                            <br /><a href="/login">Login</a>
                            <br /><a href="/register">Sign Up</a>
                            <br /><a href="/account">Settings</a>
                        </span>
                    </div> 

                </div>
                <div className="d-flex mb-3 ">
                
                    <div className="d-flex  ml-3 mr-3">
                        <span className="">
                            <br /><a href="/contact">Contact Us</a>
                            <br /><a href="/blog">Blog</a>
                        </span>
                    </div>        

                    <div className="d-flex  ml-3 mr-3">
                        <span className="">
                            <br /><a href="/privacy">Privacy Policy</a>
                            <br /><a href="/terms">Terms of Use</a>
                            <br /><a href="/sitemap.xml">Sitemap</a>
                        </span>
                    </div>   

                </div>
            </div>
        </div>
    </div>
    <div className="text-center mb-3">
        Copyright &copy; {(new Date()).getFullYear()} Pembina Labs
    </div>
    
  </div>
);

export default FooterComponent;
