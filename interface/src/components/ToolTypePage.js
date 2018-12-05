import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getToolTypes } from './../store/actions/toolTypeActions';
import { apiGetToolTypes } from './../utils/api';

function ToolTypePage(props) {
  useEffect(() => {
    props.getToolTypes();
  }, {});

  return <div>Tool type page</div>;
}

export default connect(
  null,
  { getToolTypes }
)(ToolTypePage);
