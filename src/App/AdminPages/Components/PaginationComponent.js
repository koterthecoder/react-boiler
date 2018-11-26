import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class PaginationComponent extends React.Component {






  render() {
    const { currentPage, pages, changePage } = this.props;
    // console.log({item:"pages",pages});

    console.log(currentPage);
    var intPage = parseInt(currentPage);
    console.log(intPage);
    return (
      <div>
            {pages.length > 1 &&
                <div className="mt-3" >
                    <div className="d-flex">
                        {/*<div className="ml-auto mr-auto">
                            { pages.map(page =>
                                    <span className={`mr-3 cursor-pointer ${page===currentPage ? ' font-weight-bold' : ''}`} onClick={() => changePage(page)}>{page}</span>
                                )}
                                
                        </div>*/}
                        <div className="ml-auto mr-auto">
                            { pages.length > 4 &&
                                <span>
                                    {currentPage>3 &&
                                        <span className="mr-3">. . .</span>}

                                    {currentPage>2 &&
                                        <span className="mr-3 cursor-pointer" onClick={() => changePage(intPage-2) }>{intPage-2}</span>}

                                    {currentPage>1 &&
                                        <span className="mr-3 cursor-pointer" onClick={() => changePage(intPage-1) }>{intPage-1}</span>}

                                    <span className="mr-3 cursor-pointer font-weight-bold"  >{intPage}</span>

                                    {pages.length-currentPage > 1 &&
                                        <span className="mr-3 cursor-pointer" onClick={() => changePage(intPage+1) }>{intPage+1}</span>}

                                    {pages.length-currentPage > 2 &&
                                        <span className="mr-3 cursor-pointer" onClick={() => changePage(intPage+2) }>{intPage+2}</span>}
                                    
                                    {pages.length-currentPage >3 &&
                                        <span className="mr-3">. . .</span>}

                                </span>}

                            { pages.length < 5 && pages.map(page =>
                                    <span className={`mr-3 cursor-pointer ${page===currentPage ? ' font-weight-bold' : ''}`} 
                                        onClick={() => changePage(page)}>{page}</span>)}
                                
                        </div> 
                    </div> 
                    <div className="d-flex" >
                        { intPage > 1 && 
                            <button className="mr-auto btn btn-secondary" onClick={() => changePage(intPage-1)}>Prev</button>}
                        { intPage !== Math.max(...pages) && 
                            <button className="ml-auto btn btn-secondary" onClick={() => changePage(intPage+1)}>Next</button>}
                    </div>
                </div>}      
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // const { players } = state;
  const {currentPage, pages, changePage} = ownProps;
  return {
    currentPage,
    pages,
    changePage
  };
}

// RosterPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   players: PropTypes.shape({ items: PropTypes.array, loading: PropTypes.bool }).isRequired,
// };


export default connect(mapStateToProps)(PaginationComponent);
