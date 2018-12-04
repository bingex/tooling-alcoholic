import React from 'react';
import { Link } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';
import { useDispatch } from 'redux-react-hook';
import { setCurrentUser } from './../store/actions/authActions';
import setAuthToken from './../utils/setAuthToken';

const mapState = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default React.memo(function NavigationBar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useMappedState(mapState);

  function logout() {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>LOGGED IN</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
});
