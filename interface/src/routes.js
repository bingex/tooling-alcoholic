import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Me from './components/Me';
import Homepage from './components/Homepage';
import NotFound from './components/NotFound';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/me" component={Me} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
