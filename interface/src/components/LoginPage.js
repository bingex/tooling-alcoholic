import React, { useState } from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { apiLogin } from '../utils/api';
import { setCurrentUser } from '../store/actions/authActions';
import setAuthToken from '../utils/setAuthToken';
import styles from './../styles/login.css';
import commonStyles from './../styles/common.css';

function Login(props) {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
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
      className: commonStyles.field__input
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
      this.setState({ errors });
    }

    return isValid;
  }

  function validateInputs() {
    let errors = {};

    if (Validator.isEmpty(identifier.value)) {
      errors.identifier = 'The field is required';
    }

    if (Validator.isEmpty(password.value)) {
      errors.password = 'The field is required';
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
      setErrors({});

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
            setErrors(prevState => {
              return { ...prevState, ...err.response.data.errors };
            });
          }

          setLoading(false);
        }
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h4 className={styles.headline}>Login to your account</h4>

        {errors.form && <div>{errors.form}</div>}

        <div
          className={`${commonStyles.field} ${
            errors.identifier ? 'has_error' : ''
          }`}
        >
          <label className={commonStyles.field__label}>
            Username or email:
          </label>
          <input {...identifier} />
          {errors.identifier && <span>{errors.identifier}</span>}
        </div>

        <div
          className={`${commonStyles.field} ${
            errors.password ? 'has_error' : ''
          }`}
        >
          <label className={commonStyles.field__label}>Password:</label>
          <input {...password} />
          {errors.password && <span>{errors.password}</span>}
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

export default connect(
  null,
  { setCurrentUser }
)(Login);
