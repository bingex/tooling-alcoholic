import React, { useState } from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { apiLogin } from '../utils/api';
import { setCurrentUser } from '../store/actions/authActions';
import { setErrors } from '../store/actions/commonActions';
import setAuthToken from '../utils/setAuthToken';
import styles from './../styles/common.css';

function Login(props) {
  const [isLoading, setLoading] = useState(false);
  const identifier = useInput('', 'identifier');
  const password = useInput('', 'password');

  function useInput(initialValue, name) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      setValue(e.target.value);
    }

    let obj = {
      value,
      name,
      onChange: handleChange,
      className: styles.field__input
    };

    if (name === 'identifier') {
      return { ...obj, type: 'text' };
    } else if (name === 'password') {
      return { ...obj, type: 'password', autoComplete: 'on' };
    }
  }

  function isValid() {
    const { errors, isValid } = validateInputs();

    if (!isValid) {
      props.setErrors(errors);
    }

    return isValid;
  }

  function validateInputs() {
    let errors = {};

    if (Validator.isEmpty(identifier.value)) {
      errors.identifier = 'Identifier is required';
    }

    if (Validator.isEmpty(password.value)) {
      errors.password = 'Password is required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  function onSubmit(event) {
    event.preventDefault();

    if (isValid()) {
      setLoading(true);
      props.setErrors({});

      apiLogin({ identifier: identifier.value, password: password.value }).then(
        res => {
          if (res.data) {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            props.setCurrentUser(jwtDecode(token));
            props.history.push('/me');
          }
        },
        err => {
          if (err.response) {
            props.setErrors(err.response.data.errors);
          } else {
            props.setErrors({ form: 'Something wrong with the connection' });
          }

          setLoading(false);
        }
      );
    }
  }

  return (
    <div className={styles['central-section']}>
      <form onSubmit={onSubmit} className={styles['central-section-form']}>
        <h4 className={styles['central-section-headline']}>
          Login to your account
        </h4>

        <div className={styles.field}>
          <label className={`${styles.field__label}`}>Username or email</label>
          <input {...identifier} />
        </div>

        <div className={styles.field}>
          <label className={styles.field__label}>Password</label>
          <input {...password} />
        </div>

        <div className={styles['btn-wrapper']}>
          <button className={styles.btn} disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
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
)(Login);
