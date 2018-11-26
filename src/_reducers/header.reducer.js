import headerConststants from '../_constants/header.constants';



function matchTitle(term) {
    switch (term) {
        case "contact":
            return "Contact Us";
        case "account":
            return "My Account";
        default:
            return "Home";
      }
}

function getHeader() {

      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('/');
      var isLocal = currentUrl.indexOf("3000");
      var isProd = currentUrl.indexOf("com");
      
      var postIndex = isProd > isLocal ? urlParts.indexOf("prodsite.com") : urlParts.indexOf("localhost:3000") ;

      const header = urlParts[postIndex+1]

      return matchTitle(header);

}

var initialState = { 
    title: getHeader(), 
    isLoading: false 
};




export default function (state = initialState, action) {
  switch (action.type) {
    case headerConststants.CHANGE_PAGE:
      return {
        title: matchTitle(action.page)
      };

    default:
      return state;
  }
}
