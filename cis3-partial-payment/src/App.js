import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './Home';
import CreateAmount from './CreateAmount';
import DeleteAmount from './DeleteAmount';

function App() {
  return (
    <Router>
      <Fragment>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createamount" component={CreateAmount} />
          <Route exact path="/deleteamount/:id" component={DeleteAmount} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
