import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Me from './components/Me';
import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import ToolTypePage from './components/ToolTypePage';
import CompaniesPage from './components/CompaniesPage';

export default function AppRouter() {
  return (
    <Router>
      <React.Fragment>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/tool_types" component={ToolTypePage} />
          <Route path="/companies" component={CompaniesPage} />
          <Route path="/me" component={Me} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}
