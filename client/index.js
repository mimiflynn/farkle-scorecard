import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { Home } from './screens/home/index';
import Farkle from './screens/farkle/index';
import Game from './screens/farkle/game';
import Reference from './screens/farkle/reference';
import Rules from './screens/farkle/rules';

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
        <Route path="game" component={Game} />
        <Route path="reference" component={Reference} />
        <Route path="rules" component={Rules} />
      </Route>
    </Router>
  </Provider>,
  appNode
);

