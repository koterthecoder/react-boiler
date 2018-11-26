import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
// import "./main.scss";
import configureStore from './_helpers/store';
import App from './App/App';

import configureFakeBackend from './_helpers/fake-backend';
// configureFakeBackend();

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);


if (module.hot) {
  module.hot.accept();
}
