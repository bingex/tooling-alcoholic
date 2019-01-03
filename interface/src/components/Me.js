import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Components
import SingleTool from './SingleTool';

// State management
import { getUserTools } from './../store/actions/toolActions';

// Styles
import {
  Styled__CircleButton,
  Styled__TileWrapper,
  Styled__Tile,
  Styled__TileActions,
  Styled__ToolPicture
} from './shared/StyledCommon';

// Icons
import { FaPlus } from 'react-icons/fa';

function Me(props) {
  const [modifySectionIsOpen, showModifyToolSection] = useState(false);
  const [toolToModify, setToolToModify] = useState(null);

  useEffect(
    () => {
      if (props.user && props.user.id) {
        props.getUserTools(props.user.id);
      }
    },
    [props.user]
  );

  const tools =
    props.tools &&
    props.tools.map((t, i) => (
      <Styled__Tile key={i}>
        <Styled__TileActions>{t.name}</Styled__TileActions>
        {t.picture ? <Styled__ToolPicture src={t.picture} /> : null}
      </Styled__Tile>
    ));

  return (
    <Styled__TileWrapper>
      {tools}
      <Styled__CircleButton
        onClick={() => {
          setToolToModify(null);
          showModifyToolSection(true);
        }}
      >
        <FaPlus size={20} />
      </Styled__CircleButton>
      <SingleTool
        modifySectionIsOpen={modifySectionIsOpen}
        showModifyToolSection={showModifyToolSection}
        toolToModify={toolToModify}
        user_id={props.user.id}
      />
    </Styled__TileWrapper>
  );
}

function mapStateToProps(state) {
  return {
    user: state.authReducer.user,
    tools: state.toolReducer.userTools
  };
}

export default connect(
  mapStateToProps,
  { getUserTools }
)(Me);
