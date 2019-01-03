import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Components
import SingleTool from './SingleTool';

// State management
import { getUserTools } from './../store/actions/toolActions';

// Styles
import { Styled__CircleButton } from './shared/StyledCommon';

// Icons
import { FaPlus } from 'react-icons/fa';

function Me(props) {
  const [modifySectionIsOpen, showModifyToolSection] = useState(false);
  const [toolToModify, setToolToModify] = useState(null);

  useEffect(() => {
    if (props.user && props.user.id) {
      props.getUserTools(props.user.id);
    }
  });

  return (
    <div>
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.authReducer.user
  };
}

export default connect(
  mapStateToProps,
  { getUserTools }
)(Me);
