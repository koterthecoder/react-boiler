import SiteUrls from './site-urls';

const base = `${SiteUrls.Api}api/`;
const userControls = `${base}user/`;
const adminControls = `${base}admin/`;

const ApiUrls = {

  Login: `${userControls}login`,
  FacebookLogin: `${userControls}facebook`,
  Register: `${userControls}register`,
  FacebookRegister: `${userControls}facebookregister`,
  TwoFactorVerification: `${userControls}token`,
  ReSendCode: `${userControls}resend`,
  VerifyEmail: token => `${userControls}verify/${token}`,
  UpdateUser: userControls,
  UpdatePassword: `${userControls}password`,
  SendRoute: `${userControls}sendroute`,

  VerifyEmailForReset: `${userControls}email`,
  SendResetMessage: `${userControls}reset`,
  SubmitResetCode: `${userControls}resetcode`,
  VerifyTokenForReset: `${userControls}resettoken`,

  AdminHome: `${adminControls}home`,

  AdminUser: `${adminControls}user`,
  AdminUserParam: (param) => `${adminControls}user/${param}`,
  AdminUserSearch: `${adminControls}user/search`,



};

export default ApiUrls;
