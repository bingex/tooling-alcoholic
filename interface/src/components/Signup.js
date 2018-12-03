import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import { apiGetUser, apiUserSignupRequest } from './../utils/api';

export default function SignupForm() {
  const [errors, setErrors] = useState({});
  const [invalid, setInvalid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const username = useInput('', 'username');
  const email = useInput('', 'email');
  const password = useInput('', 'password');
  const passwordConfirmation = useInput('', 'passwordConfirmation');

  function checkUserExists(event) {
    event.preventDefault();

    const field = event.target.name;
    const identificator = event.target.value;

    if (identificator !== '') {
      apiGetUser(identificator).then(res => {
        let errorsUpdated = errors;
        let invalid;
        if (res.data.user) {
          invalid = true;
          errorsUpdated[field] = `There is user with such ${field}`;
        } else {
          invalid = false;
          errorsUpdated[field] = '';
        }
        setInvalid(invalid);
        setErrors(prevState => {
          return { ...prevState, ...errorsUpdated };
        });
      });
    }
  }

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

    if (name === 'username' || name === 'email') {
      return { ...obj, type: name, onBlur: checkUserExists };
    } else if (name === 'password' || name === 'passwordConfirmation') {
      return { ...obj, type: 'password', autoComplete: 'on' };
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    if (isValid()) {
      setErrors({});
      setLoading(true);

      apiUserSignupRequest({
        username: username.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value
      }).then(
        () => {
          alert('success');
          /**
           * TODO: add notification and redirect to user ME page
           */
        },
        err => {
          setLoading(false);
          setErrors(prevState => {
            return { ...prevState, ...err.response.data };
          });
        }
      );
    }
  }

  function validateInputs() {
    /**
     * TODO: move error text to constants
     */
    let errors = {};

    if (Validator.isEmpty(username.value)) {
      errors.username = 'The field is required';
    }
    if (Validator.isEmpty(email.value)) {
      errors.email = 'The field is required';
    }
    if (!Validator.isEmail(email.value)) {
      errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(password.value)) {
      errors.password = 'The field is required';
    }
    if (Validator.isEmpty(passwordConfirmation.value)) {
      errors.passwordConfirmation = 'The field is required';
    }
    if (!Validator.equals(password.value, passwordConfirmation.value)) {
      errors.passwordConfirmation = 'Passwords must match';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  function isValid() {
    const { errors, isValid } = validateInputs();

    if (!isValid) {
      setErrors(prevState => {
        return { ...prevState, ...errors };
      });
    }

    return isValid;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Join our community!</h1>

      <TextField label="Username" field={username} error={errors.username} />
      <TextField label="Email" field={email} error={errors.email} />
      <TextField label="Password" field={password} error={errors.password} />
      <TextField
        label="Password confirmation"
        field={passwordConfirmation}
        error={errors.passwordConfirmation}
      />

      <button disabled={isLoading || invalid}>Sign up</button>
    </form>
  );
}

const TextField = ({ field, label, error }) => {
  return (
    <div className={error ? 'has_error' : ''}>
      <label>{label}</label>
      <input {...field} />
      {error && <span>{error}</span>}
    </div>
  );
};
