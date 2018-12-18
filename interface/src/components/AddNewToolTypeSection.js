import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { apiSetToolTypes } from '../utils/api';
import { addNewToolType } from '../store/actions/toolTypeActions';
import stylesCommon from './../styles/common.css';
import styles from './../styles/tool-type.css';

function AddNewToolTypeSection(props) {
  const [newTypeName, setNewTypeName] = useState('');
  const [previewPicture, changePreviewPicture] = useState(null);
  const imageElement = useRef(null);

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
          props.addNewToolType(response.data.id, newTypeName, previewPicture);
          props.showAddArea(false);
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

  /**
   * Cancel adding new tool type
   * Refresh preview picture
   * Clean new tool type name
   */
  function cancelAddNew() {
    props.showAddArea(false);
    changePreviewPicture(null);
    setNewTypeName('');
  }

  /**
   * Show picture preview after image is uploaded
   */
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
    <div
      className={`${stylesCommon.addSection} ${stylesCommon.field} ${
        props.addAreaIsOpen ? stylesCommon.addSectionOpen : ''
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
  );
}

export default connect(
  null,
  { addNewToolType }
)(AddNewToolTypeSection);
