import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../_helpers/history';
import PrivateRoute from '../_components/PrivateRoute';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ResetPasswordPage from './ResetPasswordPage';

import LandingPage from './LandingPage';



import PageLoadingScreen from '../_components/PageLoadingScreen';
import ErrorPage from './ErrorPage';

import ContactUsPage from './ContactUsPage';

import UserPage from './UserPage';
import AdminPage from './AdminPage';


import MyAccountPage from './MyAccountPage';


import VerifyAccountPage from './VerifyAccountPage';


import TwoFactorPage from './TwoFactorPage';

import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';



const AppRouter = () => (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/reset" component={ResetPasswordPage} />
            <Route exact path="/reset/:token" component={ResetPasswordPage} />

            <Route exact path="/error" component={ErrorPage} />
            <Route exact path="/twofactor" component={TwoFactorPage} />
            <Route exact path="/terms" component={TermsAndConditions} />
            <Route exact path="/privacy" component={PrivacyPolicy} />
            <Route exact path="/verify/:token" component={VerifyAccountPage} />
            <Route exact path="/contact" component={ContactUsPage} />

            
            
            <PrivateRoute exact path="/user" component={UserPage} />
            <PrivateRoute exact path="/account" component={MyAccountPage} />
            <PrivateRoute exact path="/admin" component={AdminPage} />


          </Switch>
        </Router>
);

export default AppRouter;
