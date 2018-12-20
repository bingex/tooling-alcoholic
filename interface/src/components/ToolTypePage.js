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
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

// Styles
import { Styled__CircleButton } from './shared/StyledCommon';

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
    <Styled__ToolSection key={index}>
      <Styled__ToolActions>
        <span>{item.name}</span>
        <span>
          <Styled__ToolEditIcon
            onClick={() => {
              setToolTypeToModify(item);
              showModifyToolSection(true);
            }}
            size={24}
          />
          <Styled__ToolDeleteIcon
            onClick={() => {
              deleteToolType(item.id);
            }}
            size={24}
          />
        </span>
      </Styled__ToolActions>
      <Styled__ToolPicture src={item.picture} />
    </Styled__ToolSection>
  ));

  return (
    <Styled__ToolWrapper>
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
    </Styled__ToolWrapper>
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

const Styled__ToolWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 412px) {
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
  }
`;

const Styled__ToolSection = styled.div`
  max-width: 260px;
  width: 100%;
  height: 120px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  background-color: var(--color-limed-spruce);
  margin: 0 10px 20px 10px;
  padding: 15px;
  box-sizing: border-box;
  user-select: none;
  color: var(--color-white);
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 412px) {
    min-width: calc(100% - 10px);
    height: 80px;
    margin: 0 5px 10px 5px;
    padding: 10px;
  }
`;

const Styled__ToolActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Styled__ToolPicture = styled.img`
  height: 80px;

  @media (max-width: 412px) {
    height: 50px;
  }
`;

const Styled__ToolIcon = `
  cursor: pointer;
  color: var(--color-gumbo);
  padding-right: 10px;
  transition: all 0.4s;

  :hover {
    color: var(--color-java);
  }
`;

const Styled__ToolEditIcon = styled(MdEdit)`
  ${Styled__ToolIcon};
`;

const Styled__ToolDeleteIcon = styled(MdDelete)`
  ${Styled__ToolIcon};
`;
