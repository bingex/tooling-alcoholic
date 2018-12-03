import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Topbar from './components/Topbar';
import NotFound from './components/NotFound';

export default function AppRouter() {
  return (
    <Router>
      <React.Fragment>
        <Topbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}
