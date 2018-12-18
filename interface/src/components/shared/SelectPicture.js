import React, { useRef } from 'react';
import styles from './../../styles/select-picture.css';
import stylesCommon from './../../styles/common.css';

function SelectPicture(props) {
  const imageElement = useRef(null);

  // Show picture preview after image is uploaded
  function changePreview() {
    let reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        props.changePreviewPicture(reader.result);
      },
      false
    );

    if (imageElement && imageElement.current) {
      reader.readAsDataURL(imageElement.current.files[0]);
    }
  }

  return (
    <div className={stylesCommon.field}>
      <label className={stylesCommon.field__label}>Select picture:</label>
      <input
        type="file"
        onChange={changePreview}
        ref={imageElement}
        className={styles.selectPicture}
      />
      {props.previewPicture && (
        <img
          className={styles.picturePreview}
          src={props.previewPicture}
          alt="Picture preview..."
        />
      )}
    </div>
  );
}

export default SelectPicture;
