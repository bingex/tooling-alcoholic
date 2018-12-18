import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import AppRouter from './../routes';
import setAuthToken from './../utils/setAuthToken';
import { setCurrentUser } from './../store/actions/authActions';
import { ToastContainer } from 'react-toastify';

function App(props) {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    props.setCurrentUser(jwtDecode(localStorage.jwtToken));
  }

  return (
    <React.Fragment>
      <ToastContainer autoClose={4000} />
      <AppRouter />
    </React.Fragment>
  );
}

export default connect(
  null,
  { setCurrentUser }
)(App);
