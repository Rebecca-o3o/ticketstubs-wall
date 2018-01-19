import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
  browserHistory
} from 'react-router';

import reducer from './reducers';
import { Welcome } from './welcome';
import { Registration, Login } from './auths';
import Wall from './wall';
// import EventList from './eventlist';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
store.subscribe(() => store.getState());

let router;

if (location.pathname == "/welcome/") {
  router = (<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Welcome}>
        <IndexRoute component={Registration}/>
        <Route path="/login" component={Login}/>
        <Route path='wall/:userid' component={Wall}/>
      </Route>
    </Router>
  </Provider>);
} else if (location.pathname !== "/welcome/") {

  router = (<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Wall}>
        <IndexRoute component={Wall}/>


      </Route>
    </Router>
  </Provider>);
}

ReactDOM.render(router, document.querySelector('main'));
