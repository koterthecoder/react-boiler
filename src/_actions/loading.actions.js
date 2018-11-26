import loadingConstants from '../_constants/loading.constants';


function startLoading() {
  return { type: loadingConstants.SHOULD_BE_LOADING };
}

function stopLoading() {
  return { type: loadingConstants.SHOULD_NOT_BE_LOADING };
}

export default {
  startLoading,
  stopLoading,
};
