import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// State management
import { modifyCompany } from '../store/actions/companyActions';
import { setErrors } from '../store/actions/commonActions';

// Helpers
import { apiAddCompany, apiUpdateCompany } from '../utils/api';

// Styles
import {
  Styled__SideSection,
  Styled__SideSectionHeadline,
  Styled__ButtonCancel,
  Styled__ButtonWrapper,
  Styled__FieldLabel,
  Styled__Field,
  Styled__FieldInput,
  Styled__Button
} from './shared/StyledCommon';

function SingleToolType(props) {
  const [companyName, setCompanyName] = useState('');

  // Initial lifecycle hook for name
  useEffect(
    () => {
      if (props.companyToModify) {
        setCompanyName(props.companyToModify.name);
      } else {
        setCompanyName('');
      }
    },
    [props.modifySectionIsOpen]
  );

  /**
   * Call API to add new or edit existing company
   * After success add it also to redux store
   */
  function handleSubmit() {
    if (isValid()) {
      const params = { name: companyName };

      if (props.companyToModify) {
        apiUpdateCompany({
          ...params,
          id: props.companyToModify.id
        })
          .then(handleSuccess)
          .catch(handleError);
      } else {
        apiAddCompany(params)
          .then(handleSuccess)
          .catch(handleError);
      }
    }
  }

  // Success handler after add / update company
  function handleSuccess(response) {
    if (response.data && response.data.success) {
      // Call redux action to modify store
      props.modifyCompany(response.data.id, companyName);

      // Clear related states
      stopExecution();
    } else {
      props.setErrors({
        company: 'Something gone wrong ...'
      });
    }
  }

  // Error handler after add / update company
  function handleError(errors) {
    if (errors.response) {
      props.setErrors(errors.response.data);
    }
  }

  /**
   * Minimal validation for companies
   * Check if name has at least 2 chars
   */
  function isValid() {
    let errors = {};

    if (companyName.length < 2) {
      props.setErrors({
        companyName: 'Company name should be at least 2 symbols'
      });
      return false;
    }

    return true;
  }

  /**
   * Call parent method to hide single company section
   * Clear type name state
   */
  function stopExecution() {
    props.showModifyCompanySection(false);
    setCompanyName('');
  }

  return (
    <Styled__SideSection modifySectionIsOpen={props.modifySectionIsOpen}>
      <Styled__SideSectionHeadline>
        Add / edit company:
      </Styled__SideSectionHeadline>

      <Styled__Field>
        <Styled__FieldLabel>Company name:</Styled__FieldLabel>
        <Styled__FieldInput
          type="text"
          placeholder="Name"
          value={companyName}
          onChange={event => {
            setCompanyName(event.target.value);
          }}
        />
      </Styled__Field>

      <Styled__ButtonWrapper>
        <Styled__ButtonCancel onClick={stopExecution}>
          Cancel
        </Styled__ButtonCancel>
        <Styled__Button onClick={handleSubmit}>Save</Styled__Button>
      </Styled__ButtonWrapper>
    </Styled__SideSection>
  );
}

export default connect(
  null,
  { modifyCompany, setErrors }
)(SingleToolType);
