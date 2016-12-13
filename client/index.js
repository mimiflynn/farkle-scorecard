import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { Home } from './screens/home/index';
import Farkle from './screens/farkle/index';

import configureStore from './store';

import './scss/main.scss';

const state = window.__initialState__ || undefined;
const store = configureStore(browserHistory, state);

const history = syncHistoryWithStore(browserHistory, store);

// Create app DOM node.
const appNode = document.createElement('div');
appNode.id = 'app';
document.body.appendChild(appNode);

// Render our application.
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home}>
        <IndexRoute component={Farkle} />
      </Route>
    </Router>
  </Provider>,
  appNode
);

