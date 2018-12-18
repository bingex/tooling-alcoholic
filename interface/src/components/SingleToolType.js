import React, { useState } from 'react';
import { connect } from 'react-redux';

// State management
import { addNewToolType } from '../store/actions/toolTypeActions';
import { setErrors } from '../store/actions/commonActions';

// Components
import SelectPicture from './shared/SelectPicture';

// Helpers
import { apiSetToolTypes } from '../utils/api';

// Styles
import stylesCommon from './../styles/common.css';
import styles from './../styles/tool-type.css';

function SingleToolType(props) {
  const [typeName, setTypeName] = useState('');
  const [previewPicture, changePreviewPicture] = useState(null);

  /**
   * Call API to add new tool type
   * and after success add it also to store
   */
  function handleSubmit() {
    // Check if name not empty and length > 2
    if (typeName.length < 2) {
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
    apiSetToolTypes({ name: typeName, picture: previewPicture })
      .then(response => {
        if (response.data.success) {
          props.addNewToolType(response.data.id, typeName, previewPicture);
          props.showAddArea(false);
          setTypeName('');
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
  function cancelAction() {
    props.showAddArea(false);
    changePreviewPicture(null);
    setTypeName('');
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
          placeholder="Name"
          value={typeName}
          onChange={event => {
            setTypeName(event.target.value);
          }}
        />
      </div>

      <SelectPicture
        previewPicture={previewPicture}
        changePreviewPicture={changePreviewPicture}
      />

      <div className={stylesCommon['btn-wrapper']}>
        <button
          className={`${stylesCommon.btn} ${styles.btnCancel}`}
          onClick={cancelAction}
        >
          Cancel
        </button>
        <button className={stylesCommon.btn} onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}

export default connect(
  null,
  { addNewToolType, setErrors }
)(SingleToolType);
