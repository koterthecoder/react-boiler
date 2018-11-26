import garageSaleConstants from '../_constants/garagesale.constants';
import fleaMarketConstants from '../_constants/fleamarket.constants';
import adminConstants from '../_constants/admin.constants';

import imageService from '../_services/image.service';
import alertActions from './alert.actions';
import history from '../_helpers/history';


function uploadImageForGarageSale(file, garageSaleId) {
    function request(uploadingImage) { return { type: garageSaleConstants.UPLOAD_GARAGESALE_IMAGE_REQUEST, uploadingImage }; }
    function success(uploadedImage, tempId) { return { type: garageSaleConstants.UPLOAD_GARAGESALE_IMAGE_SUCCESS, uploadedImage, tempId }; }
    function failure(failedUploadImage, error) { return { type: garageSaleConstants.UPLOAD_GARAGESALE_IMAGE_FAILURE, failedUploadImage, error }; }

    return (dispatch) => {
        dispatch(request(file));

        const formData = new FormData();
        formData.append('image', file.raw, file.name);
        formData.append('garageSaleId', garageSaleId);

        imageService.uploadImage(formData)
        .then(
            (createdFile) => {
                dispatch(success(createdFile, file.id));
            },
            (error) => {
                dispatch(failure(file, error));
            },
        );
    };
}

function uploadImageForFleaMarket(file, fleaMarketId) {
    function request(uploadingImage) { return { type: fleaMarketConstants.UPLOAD_FLEAMARKET_IMAGE_REQUEST, uploadingImage }; }
    function success(uploadedImage, tempId) { return { type: fleaMarketConstants.UPLOAD_FLEAMARKET_IMAGE_SUCCESS, uploadedImage, tempId }; }
    function failure(failedUploadImage, error) { return { type: fleaMarketConstants.UPLOAD_FLEAMARKET_IMAGE_FAILURE, failedUploadImage, error }; }

    return (dispatch) => {
        dispatch(request(file));

        const formData = new FormData();
        formData.append('image', file.raw, file.name);
        formData.append('fleaMarketId', fleaMarketId);

        imageService.uploadImage(formData)
        .then(
            (createdFile) => {
                dispatch(success(createdFile, file.id));
            },
            (error) => {
                dispatch(failure(file, error));
            },
        );
    };
}


function uploadImageForBlog(file, blogId) {
    function request(uploadingImage) { return { type: adminConstants.UPLOAD_BLOG_IMAGE_REQUEST, uploadingImage }; }
    function success(uploadedImage, tempId) { return { type: adminConstants.UPLOAD_BLOG_IMAGE_SUCCESS, uploadedImage, tempId }; }
    function failure(failedUploadImage, error) { return { type: adminConstants.UPLOAD_BLOG_IMAGE_FAILURE, failedUploadImage, error }; }

    return (dispatch) => {
        dispatch(request(file));

        const formData = new FormData();
        formData.append('image', file.raw, file.name);
        formData.append('blogId', blogId);

        imageService.uploadImage(formData)
        .then(
            (createdFile) => {
                dispatch(success(createdFile, file.id));
            },
            (error) => {
                dispatch(failure(file, error));
            },
        );
    };
}

export default {
    uploadImageForGarageSale,
    uploadImageForFleaMarket,
    uploadImageForBlog,

};
