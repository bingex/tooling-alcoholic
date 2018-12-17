import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getToolTypes,
  addNewToolType
} from './../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';
import { apiSetToolTypes } from './../utils/api';
import styles from './../styles/tool-type.css';
import { FaPlus } from 'react-icons/fa';

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
    // Check if name not empty and length > 2
    if (newTypeName.length < 2) {
      props.setErrors({
        toolTypeName: 'Tool type name should be at least 2 symbols'
      });
      return false;
    }

    // Request to server
    apiSetToolTypes({ name: newTypeName })
      .then(response => {
        if (response.data.success) {
          props.addNewToolType(newTypeName);
          showAddArea(false);
          setNewTypeName('');
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

  return (
    <div className={styles.wrapper}>
      {props.types.map((item, index) => (
        <div className={styles.section} key={index}>
          {item.name}
        </div>
      ))}

      <button className={styles.addButton} onClick={showAddArea}>
        <FaPlus size={20} />
      </button>

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
  { getToolTypes, addNewToolType, setErrors }
)(ToolTypePage);
