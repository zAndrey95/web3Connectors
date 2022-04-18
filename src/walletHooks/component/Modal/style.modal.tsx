import styled from "styled-components";
import close from "../../image/cancel.svg";

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

export const LogoWallet = styled.img`
  width: 40px;
  height: 40px;
`;

export const Container = styled.div`
  position: relative;
  width: 350px;
  background: rgb(52, 52, 52);
  border-radius: 10px;
`;

export const Connectors = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  /* height: 250px; */
`;
export const Span = styled.span`
  color: rgb(255, 255, 255);
  font-size: 1rem;
  width: 150px;
`;

export const ConnectorsItem = styled.div`
  width: 100%;
  &:not(:last-child) {
    padding-bottom: 20px;
  }
`;

export const BtnConnector = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(52, 52, 52);
  height: 50px;
  cursor: pointer;
  border: none;
  width: 100%;
  border: 1px solid rgb(153 146 146);
  border-radius: 9px;
  &:hover {
    border-color: rgb(228, 75, 5);
  }
`;

export const BtnClose = styled.button`
  position: absolute;
  background-image: url(${close});
  cursor: pointer;
  border: none;
  width: 20px;
  height: 20px;
  background-color: transparent;
  color: #fff;
  right: 2px;
  top: 2px;
`;