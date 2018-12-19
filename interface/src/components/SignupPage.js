import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import { apiGetUser, apiUserSignupRequest } from '../utils/api';
import { setErrors } from '../store/actions/commonActions';
import { connect } from 'react-redux';

import {
  Styled__Field,
  Styled__FieldLabel,
  Styled__FieldInput,
  Styled__CenterSection,
  Styled__CenterSectionWrapper,
  Styled__CenterSectionForm,
  Styled__CenterSectionHeadline,
  Styled__ButtonWrapper,
  Styled__Button
} from './shared/StyledCommon';

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
        let errors = {};
        let invalid;
        if (res.data.user) {
          invalid = true;
          errors[field] = `There is user with such ${field}`;
        } else {
          invalid = false;
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
    <Styled__CenterSectionWrapper>
      <Styled__CenterSection>
        <Styled__CenterSectionForm onSubmit={onSubmit}>
          <Styled__CenterSectionHeadline>
            Join our community!
          </Styled__CenterSectionHeadline>

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

          <Styled__ButtonWrapper>
            <Styled__Button disabled={isLoading || invalid}>
              Sign up
            </Styled__Button>
          </Styled__ButtonWrapper>
        </Styled__CenterSectionForm>
      </Styled__CenterSection>
    </Styled__CenterSectionWrapper>
  );
}

const TextField = ({ field, label, error }) => {
  return (
    <Styled__Field>
      <Styled__FieldLabel>{label}</Styled__FieldLabel>
      <Styled__FieldInput {...field} placeholder={label} />
    </Styled__Field>
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
