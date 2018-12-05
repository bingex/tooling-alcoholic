import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import AppRouter from './../routes';
import setAuthToken from './../utils/setAuthToken';
import { setCurrentUser } from './../store/actions/authActions';

function App(props) {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    props.setCurrentUser(jwtDecode(localStorage.jwtToken));
  }

  return <AppRouter />;
}

export default connect(
  null,
  { setCurrentUser }
)(App);
