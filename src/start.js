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
import Wall from './wall';



export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
// store.subscribe(() => store.getState());
store.subscribe(() => console.log("Start.js global store", store.getState()));

let router;


if(location.pathname == "/welcome/")  {
    router = (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Welcome}>
                    <IndexRoute component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path='wall/:userid' component={Wall} />
                </Route>
            </Router>
        </Provider>
    );
} else if (location.pathname !== "/welcome/") {
    // console.log("hallo! location.pathname is not /welcome");
    router = (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={Wall}>
                    <IndexRoute component={Wall} />
                    {/* <Route path='/events/:userid' component={eventlist} />
                    <Route path='/events/:userid/addticketstub' component={addticketstub} />
                    <Route path="event/:id" component={Event}/>
                    <Route path="artist/:id" component={Artist}/>
                    <Route path="venue/:id" component={Venue}/> */}
                </Route>
            </Router>
        </Provider>
    );
}

ReactDOM.render(
    router,
    document.querySelector('main')
);
