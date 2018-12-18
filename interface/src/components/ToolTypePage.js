import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getToolTypes,
  addNewToolType
} from './../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';
import { apiSetToolTypes } from './../utils/api';
import styles from './../styles/tool-type.css';
import stylesCommon from './../styles/common.css';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

function ToolTypePage(props) {
  const [addAreaIsOpen, showAddArea] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [previewPicture, changePreviewPicture] = useState(null);
  const imageElement = useRef(null);

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

    // Check if it has picture
    if (!previewPicture) {
      props.setErrors({
        toolTypePicture: 'Please add tool type picture'
      });
      return false;
    }

    // Request to server
    apiSetToolTypes({ name: newTypeName, picture: previewPicture })
      .then(response => {
        if (response.data.success) {
          props.addNewToolType(newTypeName, previewPicture);
          showAddArea(false);
          setNewTypeName('');
          changePreviewPicture(null);
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

  function cancelAddNew() {
    showAddArea(false);
    changePreviewPicture(null);
    setNewTypeName('');
  }

  function previewFile() {
    let reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        changePreviewPicture(reader.result);
      },
      false
    );

    if (imageElement && imageElement.current) {
      reader.readAsDataURL(imageElement.current.files[0]);
    }
  }

  return (
    <div className={styles.wrapper}>
      {props.types.map((item, index) => (
        <div className={styles.section} key={index}>
          <div className={styles.section__edit}>
            {item.name}
            <MdEdit className={styles.section__icon} size={24} />
          </div>
          <img className={styles.section__picture} src={item.picture} />
        </div>
      ))}
      <button className={styles.addButton} onClick={showAddArea}>
        <FaPlus size={20} />
      </button>
      <div
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
      </div>
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
