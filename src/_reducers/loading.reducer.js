import loadingConstants from '../_constants/loading.constants';

export default function (state = { isLoading: false }, action) {
  switch (action.type) {
    case loadingConstants.SHOULD_BE_LOADING:
      return {
        isLoading: true
      };
    case loadingConstants.SHOULD_NOT_BE_LOADING:
      return {
          isLoading: false
      };
    default:
      return state;
  }
}
