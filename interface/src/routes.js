import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Me from './components/Me';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';

export default function AppRouter() {
  return (
    <Router>
      <React.Fragment>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/me" component={Me} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}
