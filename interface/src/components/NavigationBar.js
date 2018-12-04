import React from 'react';
import { Link } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';
import { useDispatch } from 'redux-react-hook';
import { withRouter } from 'react-router';
import { setCurrentUser } from './../store/actions/authActions';
import setAuthToken from './../utils/setAuthToken';

const mapState = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(function NavigationBar(props) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useMappedState(mapState);

  function logout() {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    props.history.push('/');
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
