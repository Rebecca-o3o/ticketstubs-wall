import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import reducer from './reducers';
import { Welcome } from './welcome';
import { Registration, Login } from './auths';
// import { App } from './app';



export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
// store.subscribe(() => store.getState());
store.subscribe(() => console.log("Start.js global store", store.getState()));

let router = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Welcome}>
                <IndexRoute component={Registration} />
                <Route path="/login" component={Login} />
                {/* <Route path='user/:id/wall' component={Wall} /> */}
            </Route>
        </Router>
    </Provider>
);


ReactDOM.render(
    router,
    document.querySelector('main')
);
