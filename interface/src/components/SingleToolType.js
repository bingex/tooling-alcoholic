import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// State management
import { addNewToolType } from '../store/actions/toolTypeActions';
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
   * Call API to add new tool type
   * and after success add it also to store
   */
  function handleSubmit() {
    // Check if name not empty and length > 2
    if (typeName.length < 2) {
      props.setErrors({
        toolTypeName: 'Tool type name should be at least 2 symbols'
      });
      return false;
    }

    // Check if it has picture
    if (!previewPicture) {
      props.setErrors({
        toolTypePicture: 'Please add tool type picture'
      });
      return false;
    }

    // Request to server
    apiSetToolTypes({ name: typeName, picture: previewPicture })
      .then(response => {
        if (response.data.success) {
          props.addNewToolType(response.data.id, typeName, previewPicture);
          props.showAddArea(false);
          setTypeName('');
          changePreviewPicture(null);
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

  /**
   * Cancel adding new tool type
   * Refresh preview picture
   * Clean new tool type name
   */
  function cancelAction() {
    props.showAddArea(false);
    changePreviewPicture(null);
    setTypeName('');
  }
  console.log(props.addAreaIsOpen);
  return (
    <Styled__SideSection addAreaIsOpen={props.addAreaIsOpen}>
      <Styled__SideSectionHeadline>
        Add new tool type:
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
        <Styled__ButtonCancel onClick={cancelAction}>
          Cancel
        </Styled__ButtonCancel>
        <Styled__Button onClick={handleSubmit}>Add</Styled__Button>
      </Styled__ButtonWrapper>
    </Styled__SideSection>
  );
}

export default connect(
  null,
  { addNewToolType, setErrors }
)(SingleToolType);
