import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// State management
import { modifyToolType } from '../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';

// Components
import SelectPicture from './shared/SelectPicture';

// Helpers
import { apiSetToolTypes } from '../utils/api';

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
  const [typeName, setTypeName] = useState('');
  const [previewPicture, changePreviewPicture] = useState(null);

  /**
   * Set name and picture if it is edit
   */
  useEffect(
    () => {
      if (props.toolTypeToModify) {
        setTypeName(props.toolTypeToModify.name);
        changePreviewPicture(props.toolTypeToModify.picture);
      } else {
        setTypeName('');
        changePreviewPicture(null);
      }
    },
    [props.modifySectionIsOpen]
  );

  /**
   * Call API to add new or edit existing tool type
   * After success add it also to reduz store
   */
  function handleSubmit() {
    if (isValid()) {
      apiSetToolTypes({ name: typeName, picture: previewPicture })
        .then(response => {
          if (response.data && response.data.success) {
            // Call redux action to modify store
            props.modifyToolType(response.data.id, typeName, previewPicture);

            // Clear related states
            stopExecution();
          } else {
            props.setErrors({
              toolTypeName: 'Something wrong with such tool type name ...'
            });
          }
        })
        .catch(errors => {
          if (errors.response) {
            props.setErrors(errors.response.data);
          }
        });
    }
  }

  /**
   * Minimal validation for tool types
   * Check if name has at least 2 chars and is there is uploaded picture
   */
  function isValid() {
    let errors = {};

    if (typeName.length < 2) {
      errors.toolTypeName = 'Tool type name should be at least 2 symbols';
      return false;
    }

    if (!previewPicture) {
      errors.toolTypePicture = 'Please add tool type picture';
      return false;
    }

    if (Object.keys(errors).length) {
      props.setErrors({
        toolTypeName: 'Tool type name should be at least 2 symbols'
      });
    }

    return true;
  }

  /**
   * Call parent method to hide single tool type section
   * Clear type name state
   * Clear type picture state
   */
  function stopExecution() {
    props.showModifyToolSection(false);
    changePreviewPicture(null);
    setTypeName('');
  }

  return (
    <Styled__SideSection modifySectionIsOpen={props.modifySectionIsOpen}>
      <Styled__SideSectionHeadline>
        Add / edit tool type:
      </Styled__SideSectionHeadline>

      <Styled__Field>
        <Styled__FieldLabel>Type name:</Styled__FieldLabel>
        <Styled__FieldInput
          type="text"
          placeholder="Name"
          value={typeName}
          onChange={event => {
            setTypeName(event.target.value);
          }}
        />
      </Styled__Field>

      <SelectPicture
        previewPicture={previewPicture}
        changePreviewPicture={changePreviewPicture}
      />

      <Styled__ButtonWrapper>
        <Styled__ButtonCancel onClick={stopExecution}>
          Cancel
        </Styled__ButtonCancel>
        <Styled__Button onClick={handleSubmit}>Add</Styled__Button>
      </Styled__ButtonWrapper>
    </Styled__SideSection>
  );
}

export default connect(
  null,
  { modifyToolType, setErrors }
)(SingleToolType);
