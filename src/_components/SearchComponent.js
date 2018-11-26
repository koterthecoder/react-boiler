import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { debounce } from 'throttle-debounce';
import moment from 'moment';


class SearchComponent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            shouldDisplayDatalist: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.SetQueryLocation = this.SetQueryLocation.bind(this);


    }


    handleChange(event) {
        const { name, value } = event.target;
        const { dispatch, searchQuery } = this.props;

        let newModel = {
            ...searchQuery,
            [name]: value,
        };

        if (name === "location") {
            this.setState({
                shouldDisplayDatalist: true
            });
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { dispatch, searchQuery, type } = this.props;

        // console.log(type);
        if (searchQuery.location) {

        }
    }

    SearchLocation(query) {
        const { dispatch } = this.props;

        
    }


    SetQueryLocation(location) {
        const { dispatch, searchQuery } = this.props;

        let newModel = {
            ...searchQuery,
            location: `${location.City}, ${location.State}`,
            strongLocation: location,
        };

        this.setState({shouldDisplayDatalist: false});
    }





  render() {
    const { searchQuery, loading } = this.props;
    const { submitted, shouldDisplayDatalist } = this.state;
    return (
      <div name="w-100 text-center">

            <form onSubmit={this.handleSubmit} className="d-flex search-group input-group">


                <label className="ml-auto location-search"  >
                    <div className="input-group">

                        <div className="input-group-prepend">
                            <button className="h-100 btn btn-secondary-brand">
                                {!loading &&
                                    <i className="fas fa-map-marker-alt"></i>
                                }
                                { loading && <i class="fas fa-spinner"></i> }
                            </button>
                        </div>
                        <input type="text" placeholder="Location" 
                                className={` form-control${submitted && !searchQuery.location ? ' border border-danger' : ''}`}
                                aria-label="" aria-describedby="basic-addon1" autocomplete="off"
                                id="location" name="location" value={searchQuery.location} onChange={this.handleChange} />


                        <div className="input-group-append">
                            <button className="h-100 btn btn-outline-secondary" type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                      
                  </label>

            </form>

              <div className="w-100 text-center">
                    {submitted && (!searchQuery.location) &&
                        <span className="text-danger ">Location is required</span>}
                </div>
            </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { search } = state;
  const { type } = ownProps;
  const { searchQuery, loading } = search;
  return {
    searchQuery,
    type,
    loading
  };
}


export default connect(mapStateToProps)(SearchComponent);
