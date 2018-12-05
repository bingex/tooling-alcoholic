import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getToolTypes,
  addNewToolType
} from './../store/actions/toolTypeActions';
import { apiSetToolTypes } from './../utils/api';

function ToolTypePage(props) {
  const [addAreaIsOpen, showAddArea] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');

  /**
   * Get all tools from server on initial stage
   */
  useEffect(() => {
    props.getToolTypes();
  }, {});

  /**
   * Show area for adding new tool type.
   */
  function showAddArea() {
    showAddArea(true);
  }

  /**
   * Call API to add new tool type
   * and after success add it also to store
   */
  function addNewType() {
    apiSetToolTypes({ name: newTypeName }).then(
      response => {
        if (response.data.success) {
          props.addNewToolType(newTypeName);
          showAddArea(false);
          setNewTypeName('');
        } else {
          // TODO: show errors on something (e.g. name is already used)
        }
      },
      () => {
        // TODO: show errors on something (e.g. name is already used)
      }
    );
  }

  return (
    <div>
      {props.types.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}

      <button onClick={showAddArea}>Add new type</button>

      {addAreaIsOpen ? (
        <div>
          <label>Type name:</label>
          <input
            type="text"
            value={newTypeName}
            onChange={event => {
              setNewTypeName(event.target.value);
            }}
          />
          <button onClick={addNewType}>Add</button>
        </div>
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    types: state.toolTypeReducer.types
  };
}

export default connect(
  mapStateToProps,
  { getToolTypes, addNewToolType }
)(ToolTypePage);
