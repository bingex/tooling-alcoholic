import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getToolTypes } from './../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';
import { apiDeleteToolType } from './../utils/api';
import styles from './../styles/tool-type.css';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import AddNewToolTypeSection from './AddNewToolTypeSection';

function ToolTypePage(props) {
  const [addAreaIsOpen, showAddArea] = useState(false);

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

  function deleteToolType(id) {
    apiDeleteToolType(id).catch(errors => {
      if (errors.response) props.setErrors(errors.response.data);
    });
  }

  function editToolType() {}

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
      {/* <div
        className={`${stylesCommon.addSection} ${stylesCommon.field} ${
          addAreaIsOpen ? stylesCommon.addSectionOpen : ''
        }`}
      >
        <h4 className={stylesCommon.addSectionHeadline}>Add new tool type:</h4>

        <div className={stylesCommon.field}>
          <label className={stylesCommon.field__label}>Type name:</label>
          <input
            type="text"
            className={stylesCommon.field__input}
            value={newTypeName}
            onChange={event => {
              setNewTypeName(event.target.value);
            }}
          />
        </div>

        <div className={stylesCommon.field}>
          <label className={stylesCommon.field__label}>Select picture:</label>
          <input
            type="file"
            onChange={previewFile}
            ref={imageElement}
            className={styles.selectPicture}
          />
          {previewPicture && (
            <img
              className={styles.picturePreview}
              src={previewPicture}
              alt="Picture preview..."
            />
          )}
        </div>

        <div className={stylesCommon['btn-wrapper']}>
          <button
            className={`${stylesCommon.btn} ${styles.btnCancel}`}
            onClick={cancelAddNew}
          >
            Cancel
          </button>
          <button className={stylesCommon.btn} onClick={addNewType}>
            Add
          </button>
        </div>
      </div> */}
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
