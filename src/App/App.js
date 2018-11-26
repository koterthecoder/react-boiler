import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../_helpers/history';
import PrivateRoute from '../_components/PrivateRoute';

import AppRouter from './AppRouter';



import NavBar from '../_components/NavBar';
import AlertContainer from '../_components/AlertContainer';
import FooterComponent from '../_components/FooterComponent';

import PageLoadingScreen from '../_components/PageLoadingScreen';

import Favicon from 'react-favicon';


import './../main.scss'; 

const App = () => (
  <div className="bg-t-primary text-t-tertiary " id="pageContainer" >
        {/*<Favicon url={} />*/}
        <PageLoadingScreen />
            <NavBar />

            <AlertContainer />
            <div className="min-page-height">
                <AppRouter />
            </div>
      
      <FooterComponent />
  </div>
);

export default App;
