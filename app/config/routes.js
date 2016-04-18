import React from 'react';

import Main from '../components/Main';
import ShowIds from '../components/ShowIds';
import pageNt from '../components/pagenation';
//import ShowIdData from '../components/ShowIdData';
//import Login from '../components/Login';

import {Route} from 'react-router';

module.exports = (
	<Route path="/" component={Main}>
	  <Route path="s" component={ShowIds}></Route>
	  <Route path="p" component={pageNt}></Route>
	</Route>
);