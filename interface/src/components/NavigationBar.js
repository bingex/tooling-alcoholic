import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from './../store/actions/authActions';
import setAuthToken from './../utils/setAuthToken';
import styles from './../styles/navigation-bar.css';
import { MdExitToApp } from 'react-icons/md';

function NavigationBar(props) {
  function logout() {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    props.setCurrentUser({});
    props.history.push('/');
  }

  return (
    <div className={styles.bar}>
      <div className={styles['app-name']}>My tools</div>
      <div>
        {props.isAuthenticated ? (
          <div>
            <NavLink
              exact
              to="/"
              className={styles.link}
              activeClassName={styles['link-active']}
            >
              Homepage
            </NavLink>
            <NavLink
              to="/tool_types"
              className={styles.link}
              activeClassName={styles['link-active']}
            >
              Tool types
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              to="/signup"
              className={styles.link}
              activeClassName={styles['link-active']}
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              className={styles.link}
              activeClassName={styles['link-active']}
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
      <MdExitToApp onClick={logout} size={24} className={styles.exit} />
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
