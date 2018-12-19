import React, { useRef } from 'react';
import styled from 'styled-components';
import { Styled__Field, Styled__FieldLabel } from './StyledCommon';

const Styled__FileInput = styled.input`
  margin-top: 5px;
`;
const Styled__Preview = styled.img`
  height: 128px;
  width: 128px;
  padding: 20px;
  margin: 0 auto;
`;

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
    <Styled__Field>
      <Styled__FieldLabel>Select picture:</Styled__FieldLabel>

      <Styled__FileInput
        type="file"
        onChange={changePreview}
        ref={imageElement}
      />

      {props.previewPicture && (
        <Styled__Preview src={props.previewPicture} alt="Picture preview..." />
      )}
    </Styled__Field>
  );
}

export default SelectPicture;
