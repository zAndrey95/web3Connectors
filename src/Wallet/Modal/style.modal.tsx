import styled from "styled-components";

interface Props {
  isOpen?: boolean;
}

export const ModalBackdrop = styled.div<Props>`
  ${(props) => (props.isOpen ? `display: flex;` : `display: none`)};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.3); 
  z-index: 2;
  overflow: auto;
`;
