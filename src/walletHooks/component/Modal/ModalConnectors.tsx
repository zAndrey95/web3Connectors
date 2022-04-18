import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
// import { connectors } from "../../connectors";
import metamask from "../../image/metamask.svg";
import coinbaseWallet from "../../image/coinbaseWalletIcon.svg";
import walletConnectIcon from "../../image/walletConnectIcon.svg";
import formaticIcon from "../../image/formatic-Icon.svg";
import {
  ModalBackdrop,
  LogoWallet,
  Container,
  Connectors,
  Span,
  ConnectorsItem,
  BtnConnector,
  BtnClose,
} from "./style.modal";

import { useModalConnectors } from "../Modal/useModalConnectors";
import { useBtnConnect } from "../ButtonConnect/useBtnConnect";

export const ModalConnectors = () => {
  const { setIsOpen, isOpen } = useBtnConnect();
  const { setProvider } = useModalConnectors();

  useEffect(() => {
    console.log("isOpen modal", isOpen);
  }, [isOpen]);

  return (
    <>
      <ModalBackdrop isOpen={isOpen} onClick={()=>setIsOpen(!isOpen)}>
        <Container>
          <BtnClose onClick={()=>setIsOpen(!isOpen)}> </BtnClose>
          <Connectors>
            <ConnectorsItem>
              <BtnConnector onClick={() => setProvider("injected")}>
                <LogoWallet src={metamask} alt="MetaMask logo" />
                <Span> MetaMask</Span>
              </BtnConnector>
            </ConnectorsItem>

            <ConnectorsItem>
              <BtnConnector onClick={() => setProvider("walletconnect")}>
                <LogoWallet src={walletConnectIcon} alt="MetaMask logo" />
                <Span> WalletConnect</Span>
              </BtnConnector>
            </ConnectorsItem>
            <ConnectorsItem>
              <BtnConnector onClick={() => setProvider("coinbaseWallet")}>
                <LogoWallet src={coinbaseWallet} alt="MetaMask logo" />
                <Span> Coinbase Wallet</Span>
              </BtnConnector>
            </ConnectorsItem>
            <ConnectorsItem>
              <BtnConnector onClick={() => setProvider("fortmatic")}>
                <LogoWallet src={formaticIcon} alt="fortmatic logo" />
                <Span> Fortmatic</Span>
              </BtnConnector>
            </ConnectorsItem>
          </Connectors>
        </Container>
      </ModalBackdrop>
    </>
  );
};

// export default ModalConnectors;
