import React, { useState } from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'redux-react-hook';
import { apiLogin } from '../utils/api';
import { setCurrentUser } from '../store/actions/authActions';
import setAuthToken from '../utils/setAuthToken';

export default function Login(props) {
  const dispatch = useDispatch();
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
      onChange: handleChange
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
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          setAuthToken(token);
          dispatch(setCurrentUser(jwtDecode(token)));
          props.history.push('/me');
        },
        err => {
          setErrors(prevState => {
            return { ...prevState, ...err.response.data.errors };
          });
          setLoading(false);
        }
      );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>

      {errors.form && <div>{errors.form}</div>}

      <div className={errors.identifier ? 'has_error' : ''}>
        <label>Username / Email</label>
        <input {...identifier} />
        {errors.identifier && <span>{errors.identifier}</span>}
      </div>

      <div className={errors.password ? 'has_error' : ''}>
        <label>Password</label>
        <input {...password} />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <button disabled={isLoading}>Login</button>
      </div>
    </form>
  );
}
