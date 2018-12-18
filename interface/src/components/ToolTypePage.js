import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiDeleteToolType } from './../utils/api';
import AddNewToolTypeSection from './AddNewToolTypeSection';

// State management
import { getToolTypes } from './../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';

// Icons
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

// Styles
import styles from './../styles/tool-type.css';

function ToolTypePage(props) {
  const [addAreaIsOpen, showAddArea] = useState(false);

  /**
   * Gets all tools from server on initial stage
   */
  useEffect(() => {
    props.getToolTypes();
  }, {});

  /**
   * Shows area for adding new tool type.
   */
  function showAddArea() {
    showAddArea(true);
  }

  /**
   * Sends request to remove tool type by id
   * @param {Number} id
   */
  function deleteToolType(id) {
    apiDeleteToolType(id).catch(errors => {
      if (errors.response) props.setErrors(errors.response.data);
    });
  }

  function editToolType() {
    // TODO: ADD LATER
  }

  return (
    <div className={styles.wrapper}>
      {props.types.map((item, index) => (
        <div className={styles.section} key={index}>
          <div className={styles.section__edit}>
            <span>{item.name}</span>
            <span>
              <MdEdit
                onClick={editToolType}
                className={styles.section__icon}
                size={24}
              />
              <MdDelete
                onClick={() => {
                  deleteToolType(item.id);
                }}
                className={styles.section__icon}
                size={24}
              />
            </span>
          </div>
          <img className={styles.section__picture} src={item.picture} />
        </div>
      ))}
      <button className={styles.addButton} onClick={showAddArea}>
        <FaPlus size={20} />
      </button>

      <AddNewToolTypeSection
        addAreaIsOpen={addAreaIsOpen}
        showAddArea={showAddArea}
      />
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
  { getToolTypes, setErrors }
)(ToolTypePage);
