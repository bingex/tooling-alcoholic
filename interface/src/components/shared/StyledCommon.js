import styled from 'styled-components';

export const Styled__Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Styled__FieldLabel = styled.label`
  font-size: 11px;
  color: var(--color-white-rock);
  margin-top: 18px;
  text-transform: uppercase;
`;

export const Styled__FieldInput = styled.input`
  margin-top: 5px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: var(--border-radius);

  ::-webkit-input-placeholder {
    font-size: 12px;
  }
  ::-moz-placeholder {
    font-size: 12px;
  }
  :-ms-input-placeholder {
    font-size: 12px;
  }
  :-moz-placeholder {
    font-size: 12px;
  }
`;

export const Styled__CenterSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--navigation-bar-height));
`;

export const Styled__CenterSection = styled.div`
  width: 340px;
  border-radius: var(--border-radius);
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-limed-spruce);
  box-sizing: border-box;
  box-shadow: var(--shadow);
  position: relative;

  @media (max-width: 412px) {
    height: calc(100vh - var(--navigation-bar-height));
    border-radius: 0;
    width: 100vw;
    padding: 10px;
  }
`;

export const Styled__CenterSectionForm = styled.form`
  box-sizing: border-box;
  width: 100%;
`;

export const Styled__CenterSectionHeadline = styled.h4`
  margin: 5px 0px 10px 0px;
  color: var(--color-smart-blue);
  user-select: none;
`;

export const Styled__ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Styled__Button = styled.button`
  border: none;
  border-radius: var(--border-radius);
  padding: 14px;
  min-width: 100px;
  margin-top: 22px;
  text-transform: uppercase;
  cursor: pointer;
  background-color: var(--color-java);
  color: var(--color-limed-spruce);
  transition: all 0.4s;
  font-weight: bold;
  margin-left: 10px;

  :hover {
    background-color: var(--color-white);
  }
`;

export const Styled__SideSection = styled.div`
  width: 320px;
  height: calc(100% - var(--navigation-bar-height));
  background-color: var(--color-lochinvar);
  position: fixed;
  bottom: 0;
  right: 0;
  margin-top: var(--navigation-bar-height);
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  transition: all 0.2s;
  box-shadow: var(--shadow);
  transform: translateX(
    ${props => (props.modifySectionIsOpen ? '0' : '320px')}
  );

  @media (max-width: 412px) {
    width: 100%;
    transform: translateX(
      ${props => (props.modifySectionIsOpen ? '0' : '100%')}
    );
  }
`;

export const Styled__SideSectionHeadline = styled.h4`
  margin-bottom: 5px;
  color: var(--color-limed-spruce);
`;

export const Styled__ButtonCancel = styled(Styled__Button)`
  background-color: var(--color-scooter);
  color: var(--color-limed-spruce);
`;

export const Styled__CircleButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: var(--shadow);
  border: none;
  cursor: pointer;
  background-color: var(--color-flory);
  color: var(--color-white);
  transition: all 0.4s;

  :hover {
    transform: scale(1.1);
  }

  @media (max-width: 412px) {
    right: 10px;
    bottom: 10px;
    height: 60px;
    width: 60px;
  }
`;
