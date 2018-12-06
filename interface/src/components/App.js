import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import AppRouter from './../routes';
import setAuthToken from './../utils/setAuthToken';
import { setCurrentUser } from './../store/actions/authActions';
import { setErrors } from './../store/actions/commonActions';
import { ToastContainer } from 'react-toastify';

function App(props) {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    props.setCurrentUser(jwtDecode(localStorage.jwtToken));
  }

  return (
    <div>
      <ToastContainer autoClose={4000} />
      <AppRouter />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errors: state.commonReducer.errors
  };
}

export default connect(
  mapStateToProps,
  { setCurrentUser, setErrors }
)(App);
