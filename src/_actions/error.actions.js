import errorConstants from '../_constants/error.constants';

import history from './../_helpers/history';

function goToErrorPage(code, message) {

    function error() {
        return { type: errorConstants.GET_ERROR_PAGE, code, message };
    }

    return (dispatch) => {
        dispatch(error());
        history.push('/error');

    };
}


export default {
  success,
  error,
  clear,
};
