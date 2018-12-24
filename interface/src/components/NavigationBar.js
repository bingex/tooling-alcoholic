import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setCurrentUser } from './../store/actions/authActions';
import setAuthToken from './../utils/setAuthToken';
import { MdExitToApp } from 'react-icons/md';

function NavigationBar(props) {
  function logout() {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    props.setCurrentUser({});
    props.history.push('/');
  }

  return (
    <Styled__NavBar>
      <Styled__NavBarAppName>My tools</Styled__NavBarAppName>
      <div>
        {props.isAuthenticated ? (
          <div>
            <Styled__NavLink exact to="/" activeClassName="link-active">
              Homepage
            </Styled__NavLink>
            <Styled__NavLink
              exact
              to="/companies"
              activeClassName="link-active"
            >
              Companies
            </Styled__NavLink>
            <Styled__NavLink to="/tool_types" activeClassName="link-active">
              Tool types
            </Styled__NavLink>
          </div>
        ) : (
          <div>
            <Styled__NavLink to="/signup" activeClassName="link-active">
              Signup
            </Styled__NavLink>
            <Styled__NavLink to="/login" activeClassName="link-active">
              Login
            </Styled__NavLink>
          </div>
        )}
      </div>
      <Styled__NavBarLogout onClick={logout} size={24} />
    </Styled__NavBar>
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

const Styled__NavBar = styled.div`
  background-color: var(--color-scooter);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navigation-bar-height);
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: var(--shadow);

  @media (max-width: 412px) {
    padding: 0 5px;
  }
`;

const Styled__NavBarAppName = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  color: var(--color-lochinvar);
  user-select: none;

  @media (max-width: 412px) {
    display: none;
  }
`;

const Styled__NavLink = styled(NavLink)`
  text-transform: uppercase;
  font-size: 12px;
  margin: 0px 5px;
  color: var(--color-smart-blue);
  transition: all 0.4s;
  text-decoration: none;
  font-weight: bold;

  :hover {
    color: var(--color-white);
  }
`;

const Styled__NavBarLogout = styled(MdExitToApp)`
  color: var(--color-lochinvar);
  cursor: pointer;
  transition: all 0.4s;

  :hover {
    color: var(--color-white);
  }
`;
