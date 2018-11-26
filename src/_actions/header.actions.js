

import headerConstants from './../_constants/header.constants';


function goToPage(page) {
    return { type: headerConstants.CHANGE_PAGE, page };
}

export default {
  goToPage,
};
