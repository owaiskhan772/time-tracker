import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import logger from 'redux-logger'; //install it using: npm install --save-dev redux-logger

import reducers from './reducers/index';

import App from './app';
import Tracker from './components/pages/tracker';

//REDUX principle: Only a single STORE per application can hold one STATE which should be immutable
const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Tracker } />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);
