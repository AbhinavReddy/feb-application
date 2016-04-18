import React from 'react';
import ReactDOM from 'react-dom';
import actions from "./actions/actions";
const initialState = {
	threadIds : {
		ids :actions.getAllData(),
		currentId:null
	}
}

//Middleware for store
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

// importing routerStateReducer from redux
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { Router, browserHistory, hashHistory } from 'react-router'

import routes from './config/routes';

//import reducers
import threadIds from './redux/threadIds';
import threadData from './redux/threadData';
import apiReducer from './redux/apiReducer';

//creating root reducer febApp
import {combineReducers} from 'redux';
const febApp = combineReducers({
  //routing: routerReducer,
  threadIds,
  threadData,
  apiReducer
});


//Provider to inject store to child components
import {Provider} from 'react-redux';

//redux store
import {createStore,applyMiddleware} from 'redux';

var store = createStore(
	febApp,
	initialState,
	applyMiddleware(thunkMiddleware)
	);
//const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
	);

//history.listen(location => {console.log(location.pathname)});

