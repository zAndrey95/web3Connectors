import React from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { connectors } from "../connectors";
import { ModalBackdrop } from "./style.modal";
import metamask from "../image/metamask.svg";
import coinbaseWallet from "../image/coinbaseWalletIcon.svg";
import walletConnectIcon from "../image/walletConnectIcon.svg";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalConnectors = ({ isOpen, closeModal }: IProps) => {
  const { activate } = useWeb3React();

  const setProvider = (type: string) => {
    if (type) {
      window.localStorage.setItem("provider", type);
      //@ts-ignore  window.web3   window.ethereum
      if (type === "injected" && !window.web3 && !window.ethereum) {
        alert("Recommended to install MetaMask wallet https://metamask.io/ ");
      }
    }
  };

  return (
    <>
      <ModalBackdrop isOpen={isOpen}>
        <Container>
          <BtnClose onClick={closeModal}> X </BtnClose>
          <Connectors>
            <ConnectorsItem>
              <BtnConnector
                onClick={() => {
                  activate(connectors.coinbaseWallet);
                  setProvider("coinbaseWallet");
                  closeModal();
                }}
              >
                <img
                  width={40}
                  height={40}
                  src={coinbaseWallet}
                  alt="MetaMask logo"
                />
                <Span> Coinbase Wallet</Span>
              </BtnConnector>
            </ConnectorsItem>
            <ConnectorsItem>
              <BtnConnector
                onClick={() => {
                  activate(connectors.walletconnect);
                  setProvider("walletconnect");
                  closeModal();
                }}
              >
                <img
                  width={40}
                  height={40}
                  src={walletConnectIcon}
                  alt="MetaMask logo"
                />
                <Span> WalletConnect</Span>
              </BtnConnector>
            </ConnectorsItem>
            <ConnectorsItem>
              <BtnConnector
                onClick={() => {
                  activate(connectors.injected);
                  setProvider("injected");
                  closeModal();
                }}
              >
                <img
                  width={40}
                  height={40}
                  src={metamask}
                  alt="MetaMask logo"
                />
                <Span> MetaMask</Span>
              </BtnConnector>
            </ConnectorsItem>
          </Connectors>
        </Container>
      </ModalBackdrop>
    </>
  );
};

export default ModalConnectors;

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
  height: 180px;
`;
export const Span = styled.span`
  color: rgb(255, 255, 255);
  font-size: 1rem;
  width: 150px;
`;

export const ConnectorsItem = styled.div`
  width: 100%;
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
  cursor: pointer;
  border: none;
  width: 20px;
  background-color: transparent;
  color: #fff;
  right: 2px;
  top: 5px;
`;
