import React from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'redux-react-hook';
import AppRouter from './../routes';
import setAuthToken from './../utils/setAuthToken';
import { setCurrentUser } from './../store/actions/authActions';

export default function App() {
  const dispatch = useDispatch();

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }

  return <AppRouter />;
}
