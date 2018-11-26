import userConstants from '../_constants/user.constants';
import userService from '../_services/user.service';
import alertActions from './alert.actions';
import loadingActions from './loading.actions';

import adminConstants from '../_constants/admin.constants';

import adminService from './../_services/admin.service';



function getHomeInfo() {
    function request() { return { type: adminConstants.GET_HOME_REQUEST }; }
    function success(homeDetails) { return { type: adminConstants.GET_HOME_SUCCESS, homeDetails }; }
    function failure(error) { return { type: adminConstants.GET_HOME_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getHomeInfo()
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(response));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}





function updateUserState(user) {
    return { type: adminConstants.UPDATE_USER_STATE, user };
}

function saveUser(user) {
    function request() { return { type: adminConstants.SAVE_USER_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_USER_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_USER_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveUser(user)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getUsers(0));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteUser(id) {
    function request() { return { type: adminConstants.DELETE_USER_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_USER_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_USER_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteUser(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}


function getUsers(start) {
    function request() { return { type: adminConstants.GET_USER_REQUEST }; }
    function success(users, pages) { return { type: adminConstants.GET_USER_SUCCESS, users, pages }; }
    function failure(error) { return { type: adminConstants.GET_USER_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getUsers(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                
                dispatch(success(response.Users, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchUsers(query, start, count) {
    function request() { return { type: adminConstants.GET_USER_REQUEST }; }
    function success(users, pages) { return { type: adminConstants.GET_USER_SUCCESS, users, pages }; }
    function failure(error) { return { type: adminConstants.GET_USER_FAILURE, error }; }

    var data = {
        Query: query,
        Start: start,
        Count: count,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchUsers(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.Users, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}







function updateCouponState(coupon) {
    return { type: adminConstants.UPDATE_COUPON_STATE, coupon };
}

function saveCoupon(coupon) {
    function request() { return { type: adminConstants.SAVE_COUPON_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_COUPON_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_COUPON_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveCoupon(coupon)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getCoupons(0));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteCoupon(id) {
    function request() { return { type: adminConstants.DELETE_COUPON_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_COUPON_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_COUPON_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteCoupon(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function getCoupons(start) {
    function request() { return { type: adminConstants.GET_COUPONS_REQUEST }; }
    function success(coupons, pages) { return { type: adminConstants.GET_COUPONS_SUCCESS, coupons, pages }; }
    function failure(error) { return { type: adminConstants.GET_COUPONS_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getCoupons(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.Coupons, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchCoupons(query, start, count) {
    function request() { return { type: adminConstants.GET_COUPONS_REQUEST }; }
    function success(coupons, pages) { return { type: adminConstants.GET_COUPONS_SUCCESS, coupons, pages }; }
    function failure(error) { return { type: adminConstants.GET_COUPONS_FAILURE, error }; }

    var data = {
        Query: query,
        Start: start,
        Count: count,
    };
    // console.log(data);
    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchCoupons(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.Coupons, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}






function saveGarageSale(garageSale) {
    function request() { return { type: adminConstants.SAVE_GARAGESALE_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_GARAGESALE_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_GARAGESALE_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveGarageSale(garageSale)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getGarageSales(0));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteGarageSale(id) {
    function request() { return { type: adminConstants.DELETE_GARAGESALE_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_GARAGESALE_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_GARAGESALE_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteGarageSale(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function getGarageSales(start) {
    function request() { return { type: adminConstants.GET_GARAGESALE_REQUEST }; }
    function success(garageSales, pages) { return { type: adminConstants.GET_GARAGESALE_SUCCESS, garageSales, pages }; }
    function failure(error) { return { type: adminConstants.GET_GARAGESALE_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getGarageSales(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(response.GarageSales, response.Pages));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchGarageSales(query, start, count) {
    function request() { return { type: adminConstants.GET_GARAGESALE_REQUEST }; }
    function success(garageSales, pages) { return { type: adminConstants.GET_GARAGESALE_SUCCESS, garageSales, pages }; }
    function failure(error) { return { type: adminConstants.GET_GARAGESALE_FAILURE, error }; }

    var data = {
        Query: query,
        Start: start,
        Count: count,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchGarageSales(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.GarageSales, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}




function updateBlogState(blog) {
    return { type: adminConstants.UPDATE_BLOG_STATE, blog };
}

function saveBlog(blog) {
    function request() { return { type: adminConstants.SAVE_BLOG_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_BLOG_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_BLOG_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveBlog(blog)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getBlogs(0));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteBlog(id) {
    function request() { return { type: adminConstants.DELETE_BLOG_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_BLOG_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_BLOG_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteBlog(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function getBlogs(start) {
    function request() { return { type: adminConstants.GET_BLOG_REQUEST }; }
    function success(blogs, pages, categories) { return { type: adminConstants.GET_BLOG_SUCCESS, blogs, pages, categories }; }
    function failure(error) { return { type: adminConstants.GET_BLOG_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getBlogs(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.Blogs, response.Pages, response.Categories));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchBlogs(query, start, count) {
    function request() { return { type: adminConstants.GET_BLOG_REQUEST }; }
    function success(blogs, pages) { return { type: adminConstants.GET_BLOG_SUCCESS, blogs, pages }; }
    function failure(error) { return { type: adminConstants.GET_BLOG_FAILURE, error }; }

    var data = {
        Query: query,
        CategoryId: 0,
        Start: start,
        Count: count,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchBlogs(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.Blogs, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}







function updateBlogCategoryState(blogCategory) {
    return { type: adminConstants.UPDATE_BLOGCATEGORY_STATE, blogCategory };
}

function saveBlogCategory(blogCategory) {
    function request() { return { type: adminConstants.SAVE_BLOGCATEGORY_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_BLOGCATEGORY_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_BLOGCATEGORY_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveBlogCategory(blogCategory)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getBlogCategories(0));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteBlogCategory(id) {
    function request() { return { type: adminConstants.DELETE_BLOGCATEGORY_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_BLOGCATEGORY_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_BLOGCATEGORY_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteBlogCategory(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function getBlogCategories(start) {
    function request() { return { type: adminConstants.GET_BLOGCATEGORY_REQUEST }; }
    function success(blogCategories, pages) { return { type: adminConstants.GET_BLOGCATEGORY_SUCCESS, blogCategories, pages }; }
    function failure(error) { return { type: adminConstants.GET_BLOGCATEGORY_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getBlogCategories(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.BlogCategories, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchBlogCategories(query, start, count) {
    function request() { return { type: adminConstants.GET_BLOGCATEGORY_REQUEST }; }
    function success(blogCategories, pages) { return { type: adminConstants.GET_BLOGCATEGORY_SUCCESS, blogCategories, pages }; }
    function failure(error) { return { type: adminConstants.GET_BLOGCATEGORY_FAILURE, error }; }

    var data = {
        Query: query,
        Start: start,
        Count: count,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchBlogCategories(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.BlogCategories, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}






function updateGarageSaleCategoryState(garageSaleCategory) {
    return { type: adminConstants.UPDATE_GARAGESALECATEGORY_STATE, garageSaleCategory };
}

function saveGarageSaleCategory(garageSaleCategory) {
    function request() { return { type: adminConstants.SAVE_GARAGESALECATEGORY_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_GARAGESALECATEGORY_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_GARAGESALECATEGORY_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveGarageSaleCategory(garageSaleCategory)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getGarageSaleCategories(0));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteGarageSaleCategory(id) {
    function request() { return { type: adminConstants.DELETE_GARAGESALECATEGORY_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_GARAGESALECATEGORY_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_GARAGESALECATEGORY_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteGarageSaleCategory(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function getGarageSaleCategories(start) {
    function request() { return { type: adminConstants.GET_GARAGESALECATEGORY_REQUEST }; }
    function success(garageSaleCategories, pages) { return { type: adminConstants.GET_GARAGESALECATEGORY_SUCCESS, garageSaleCategories, pages }; }
    function failure(error) { return { type: adminConstants.GET_GARAGESALECATEGORY_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getGarageSaleCategories(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(response.GarageSaleCategories, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchGarageSaleCategories(query, start, count) {
    function request() { return { type: adminConstants.GET_GARAGESALECATEGORY_REQUEST }; }
    function success(garageSaleCategories, pages) { return { type: adminConstants.GET_GARAGESALECATEGORY_SUCCESS, garageSaleCategories, pages }; }
    function failure(error) { return { type: adminConstants.GET_GARAGESALECATEGORY_FAILURE, error }; }

    var data = {
        Query: query,
        Start: start,
        Count: count,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchGarageSaleCategories(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.GarageSaleCategories, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}








function saveFleaMarket(fleaMarket) {
    function request() { return { type: adminConstants.SAVE_FLEAMARKET_REQUEST }; }
    function success() { return { type: adminConstants.SAVE_FLEAMARKET_SUCCESS }; }
    function failure(error) { return { type: adminConstants.SAVE_FLEAMARKET_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.saveFleaMarket(fleaMarket)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(getFleaMarkets(0));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function deleteFleaMarket(id) {
    function request() { return { type: adminConstants.DELETE_FLEAMARKET_REQUEST }; }
    function success(deleteId) { return { type: adminConstants.DELETE_FLEAMARKET_SUCCESS, deleteId }; }
    function failure(error) { return { type: adminConstants.DELETE_FLEAMARKET_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.deleteFleaMarket(id)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(id));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function getFleaMarkets(start) {
    function request() { return { type: adminConstants.GET_FLEAMARKET_REQUEST }; }
    function success(fleaMarkets, pages) { return { type: adminConstants.GET_FLEAMARKET_SUCCESS, fleaMarkets, pages }; }
    function failure(error) { return { type: adminConstants.GET_FLEAMARKET_FAILURE, error }; }


    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.getFleaMarkets(start)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success(response.FleaMarkets, response.Pages));
            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}

function searchFleaMarkets(query, start, count) {
    function request() { return { type: adminConstants.GET_FLEAMARKET_REQUEST }; }
    function success(fleaMarkets, pages) { return { type: adminConstants.GET_FLEAMARKET_SUCCESS, fleaMarkets, pages }; }
    function failure(error) { return { type: adminConstants.GET_FLEAMARKET_FAILURE, error }; }

    var data = {
        Query: query,
        Start: start,
        Count: count,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.searchFleaMarkets(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());

                dispatch(success(response.FleaMarkets, response.Pages));

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}









function flagEntity(id, flagType) {
    function request() { return { type: adminConstants.FLAG_ENTITY_REQUEST }; }
    function success() { return { type: adminConstants.FLAG_ENTITY_SUCCESS }; }
    function failure(error) { return { type: adminConstants.FLAG_ENTITY_FAILURE, error }; }

    var data = {
        Type: flagType,
        EntityId: id,
    };

    return (dispatch) => {
        dispatch(loadingActions.startLoading());
        dispatch(request());

        adminService.flagEntity(data)
        .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                switch (flagType) {
                    case 1:
                        dispatch(alertActions.success("Garage Sale was flagged for review"));
                        break;
                    case 2:
                        dispatch(alertActions.success("Flea Market was flagged for review"));
                        break;
                }
                
                dispatch(success());

            },
            (error) => {
                dispatch(loadingActions.stopLoading());
                dispatch(failure());
            },
        );

    };
}




export default {

    getHomeInfo,




    deleteGarageSale,
    saveGarageSale,
    getGarageSales,
    searchGarageSales,




    updateUserState,
    saveUser,
    deleteUser,
    getUsers,
    searchUsers,


    updateCouponState,
    saveCoupon,
    getCoupons,
    searchCoupons,
    deleteCoupon,

    updateBlogState,
    saveBlog,
    deleteBlog,
    getBlogs,
    searchBlogs,


    updateBlogCategoryState,
    saveBlogCategory,
    deleteBlogCategory,
    getBlogCategories,
    searchBlogCategories,


    updateGarageSaleCategoryState,
    saveGarageSaleCategory,
    deleteGarageSaleCategory,
    getGarageSaleCategories,
    searchGarageSaleCategories,



    saveFleaMarket,
    deleteFleaMarket,
    getFleaMarkets,
    searchFleaMarkets,


    flagEntity,

};
