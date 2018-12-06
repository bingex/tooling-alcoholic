import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from './../store/actions/authActions';
import setAuthToken from './../utils/setAuthToken';
import styles from './../styles/navigation-bar.css';

function NavigationBar(props) {
  function logout() {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    props.setCurrentUser({});
    props.history.push('/');
  }

  return (
    <div className={styles.bar}>
      {props.isAuthenticated ? (
        <div>
          <span>LOGGED IN</span>
          <Link to="/tool_types">Tool types</Link>
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
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { setCurrentUser }
  )(NavigationBar)
);
