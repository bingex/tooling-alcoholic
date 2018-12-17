import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import { apiGetUser, apiUserSignupRequest } from '../utils/api';
import { setErrors } from '../store/actions/commonActions';
import styles from './../styles/common.css';
import { connect } from 'react-redux';

function SignupForm(props) {
  const [invalid, setInvalid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const username = useInput('', 'username');
  const email = useInput('', 'email');
  const password = useInput('', 'password');
  const passwordConfirmation = useInput('', 'passwordConfirmation');

  function checkUserExists(event) {
    event.preventDefault();

    const field = event.target.name;
    const identifier = event.target.value;

    if (identifier !== '') {
      apiGetUser(identifier).then(res => {
        let errors;
        let invalid;
        if (res.data.user) {
          invalid = true;
          errors[field] = `There is user with such ${field}`;
        } else {
          invalid = false;
          errors[field] = '';
        }
        setInvalid(invalid);
        props.setErrors(errors);
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
      props.setErrors({});
      setLoading(true);

      apiUserSignupRequest({
        username: username.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value
      }).then(
        () => {
          alert('success');
          props.history.push('login');
        },
        err => {
          setLoading(false);
          if (err.response) {
            props.setErrors(err.response.data);
          }
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
      errors.username = 'Username is required';
    }
    if (Validator.isEmpty(email.value)) {
      errors.email = 'Email is required';
    }
    if (!Validator.isEmail(email.value)) {
      errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(password.value)) {
      errors.password = 'Password is required';
    }
    if (Validator.isEmpty(passwordConfirmation.value)) {
      errors.passwordConfirmation = 'Password confirm is required';
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
      props.setErrors(errors);
    }

    return isValid;
  }

  return (
    <div className={styles.center}>
      <div className={styles['center-section']}>
        <form onSubmit={onSubmit} className={styles['center-section-form']}>
          <h4 className={styles['center-section-headline']}>
            Join our community!
          </h4>

          <TextField
            label="Username"
            field={username}
            error={props.errors.username}
          />
          <TextField label="Email" field={email} error={props.errors.email} />
          <TextField
            label="Password"
            field={password}
            error={props.errors.password}
          />
          <TextField
            label="Password confirmation"
            field={passwordConfirmation}
            error={props.errors.passwordConfirmation}
          />

          <div className={styles['btn-wrapper']}>
            <button className={styles.btn} disabled={isLoading || invalid}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const TextField = ({ field, label, error }) => {
  return (
    <div className={styles.field}>
      <label className={styles.field__label}>{label}</label>
      <input {...field} className={styles.field__input} placeholder={label} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.commonReducer.errors
  };
}

export default connect(
  mapStateToProps,
  { setErrors }
)(SignupForm);
