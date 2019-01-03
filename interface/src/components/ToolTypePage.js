import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiDeleteToolType } from './../utils/api';
import SingleToolType from './SingleToolType';
import styled from 'styled-components';

// State management
import {
  getToolTypes,
  removeToolType
} from './../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';

// Icons
import { FaPlus } from 'react-icons/fa';

// Styles
import {
  Styled__CircleButton,
  Styled__TileWrapper,
  Styled__Tile,
  Styled__TileActions,
  Styled__TileEdit,
  Styled__TileDelete,
  Styled__ToolPicture
} from './shared/StyledCommon';

function ToolTypePage(props) {
  const [modifySectionIsOpen, showModifyToolSection] = useState(false);
  const [toolTypeToModify, setToolTypeToModify] = useState(null);

  /**
   * Gets all tools from server on initial stage
   */
  useEffect(() => {
    props.getToolTypes();
  }, {});

  /**
   * Sends request to remove tool type by id
   * @param {Number} id
   */
  function deleteToolType(id) {
    apiDeleteToolType(id)
      .then(response => {
        if (response.data && response.data.success) {
          props.removeToolType(id);
        }
      })
      .catch(errors => {
        if (errors.response) props.setErrors(errors.response.data);
      });
  }

  // Renders tool type list from store data
  const toolTypes = props.types.map((item, index) => (
    <Styled__Tile key={index}>
      <Styled__TileActions>
        <span>{item.name}</span>
        <span>
          <Styled__TileEdit
            onClick={() => {
              setToolTypeToModify(item);
              showModifyToolSection(true);
            }}
            size={24}
          />
          <Styled__TileDelete
            onClick={() => {
              deleteToolType(item.id);
            }}
            size={24}
          />
        </span>
      </Styled__TileActions>
      <Styled__ToolPicture src={item.picture} />
    </Styled__Tile>
  ));

  return (
    <Styled__TileWrapper>
      {toolTypes}

      <Styled__CircleButton
        onClick={() => {
          setToolTypeToModify(null);
          showModifyToolSection(true);
        }}
      >
        <FaPlus size={20} />
      </Styled__CircleButton>

      <SingleToolType
        modifySectionIsOpen={modifySectionIsOpen}
        showModifyToolSection={showModifyToolSection}
        toolTypeToModify={toolTypeToModify}
      />
    </Styled__TileWrapper>
  );
}

function mapStateToProps(state) {
  return {
    types: state.toolTypeReducer.types
  };
}

export default connect(
  mapStateToProps,
  { getToolTypes, removeToolType, setErrors }
)(ToolTypePage);
