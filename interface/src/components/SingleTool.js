import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// State management
import { modifyTool } from '../store/actions/toolActions';
import { getToolTypes } from '../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';

// Components
import SelectPicture from './shared/SelectPicture';

// Helpers
import { apiAddTool, apiUpdateTool } from '../utils/api';

// Styles
import {
  Styled__SideSection,
  Styled__SideSectionHeadline,
  Styled__ButtonCancel,
  Styled__ButtonWrapper,
  Styled__FieldLabel,
  Styled__Field,
  Styled__FieldInput,
  Styled__Button,
  Styled__FieldSelect
} from './shared/StyledCommon';

function SingleToolType(props) {
  const [toolName, setToolName] = useState('');
  const [previewPicture, changePreviewPicture] = useState(null);
  const [selectedType, changeSelectedType] = useState('');

  // Initial lifecycle hook for setting name and picture
  useEffect(
    () => {
      if (props.toolToModify) {
        setToolName(props.toolToModify.name);
        changePreviewPicture(props.toolToModify.picture);
      } else {
        setToolName('');
        changePreviewPicture(null);
      }
    },
    [props.modifySectionIsOpen]
  );

  // Get tool types on load
  useEffect(() => {
    props.getToolTypes();
  }, {});

  // Set initial tool type
  useEffect(
    () => {
      if (props.types && props.types.length) {
        changeSelectedType(props.types[0].id);
      }
    },
    [props.types]
  );

  /**
   * Call API to add new or edit existing tool
   * After success add it also to redux store
   */
  function handleSubmit() {
    if (isValid()) {
      const params = {
        name: toolName,
        picture: previewPicture,
        user_id: props.user_id,
        tool_type_id: selectedType
      };

      if (props.toolToModify) {
        apiUpdateTool({
          ...params,
          id: props.toolToModify.id
        })
          .then(handleSuccess)
          .catch(handleError);
      } else {
        apiAddTool(params)
          .then(handleSuccess)
          .catch(handleError);
      }
    }
  }

  // Success handler after add / update tool
  function handleSuccess(response) {
    if (response.data && response.data.success) {
      // Call redux action to modify store
      props.modifyTool(
        response.data.id,
        toolName,
        previewPicture,
        selectedType,
        props.user_id
      );

      // Clear related states
      stopExecution();
    } else {
      props.setErrors({
        tool: 'Something gone wrong ...'
      });
    }
  }

  // Error handler after add / update tool
  function handleError(errors) {
    if (errors.response) {
      props.setErrors(errors.response.data);
    }
  }

  /**
   * Minimal validation for tool
   * Check if name has at least 2 chars and is there is uploaded picture
   */
  function isValid() {
    let errors = {};

    if (toolName.length < 2) {
      errors.toolName = 'Tool name should be at least 2 symbols';
    }

    if (Object.keys(errors).length) {
      props.setErrors(errors);
      return false;
    }

    return true;
  }

  /**
   * Call parent method to hide single tool section
   * Clear type name state
   * Clear type picture state
   */
  function stopExecution() {
    props.showModifyToolSection(false);
    changePreviewPicture(null);
    setToolName('');
  }

  return (
    <Styled__SideSection modifySectionIsOpen={props.modifySectionIsOpen}>
      <Styled__SideSectionHeadline>
        Add / edit tool:
      </Styled__SideSectionHeadline>

      <Styled__Field>
        <Styled__FieldLabel>Name:</Styled__FieldLabel>
        <Styled__FieldInput
          type="text"
          placeholder="Name"
          value={toolName}
          onChange={event => {
            setToolName(event.target.value);
          }}
        />
      </Styled__Field>

      <Styled__Field>
        <Styled__FieldLabel>Type:</Styled__FieldLabel>
        <Styled__FieldSelect
          value={selectedType}
          onChange={event => {
            changeSelectedType(event.target.value);
          }}
        >
          {props.types.map((t, i) => (
            <option key={i} value={t.id}>
              {t.name}
            </option>
          ))}
        </Styled__FieldSelect>
      </Styled__Field>

      <SelectPicture
        previewPicture={previewPicture}
        changePreviewPicture={changePreviewPicture}
      />

      <Styled__ButtonWrapper>
        <Styled__ButtonCancel onClick={stopExecution}>
          Cancel
        </Styled__ButtonCancel>
        <Styled__Button onClick={handleSubmit}>Save</Styled__Button>
      </Styled__ButtonWrapper>
    </Styled__SideSection>
  );
}

function mapStateToProps(state) {
  return {
    types: state.toolTypeReducer.types
  };
}

export default connect(
  mapStateToProps,
  { modifyTool, setErrors, getToolTypes }
)(SingleToolType);
