import { shortAddress, convertToNormal } from "../../utils";
import { useModalConnectors } from "../Modal/useModalConnectors";
import { useBtnConnect } from "./useBtnConnect";
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
} from "../Modal/style.modal";

import {
  ButtonLogOut,
  Button,
  AccountDiv,
  WalletSpan,
} from "./connectButton.style";

export const ConnectButton = () => {
  const { active, balance, account, disconnect, setIsOpen, isOpen } =
    useBtnConnect();
  // const { setProvider } = useModalConnectors();

  return (
    <>
      {!active ? (
        <Button onClick={()=>setIsOpen(!isOpen)}>Connect Wallet</Button>
      ) : (
        <>
          <AccountDiv>
            <span>{convertToNormal(balance, 18, 4)}</span>
            <WalletSpan>{shortAddress(account)}</WalletSpan>
            <ButtonLogOut onClick={disconnect}></ButtonLogOut>
          </AccountDiv>
        </>
      )}
      {/* <Modal isOpen={isOpen} openModal={openModal} setProvider={setProvider} /> */}
    </>
  );
};

// export const Modal = ({ isOpen, openModal, setProvider }: any) => {
//   return (
//     <>
//       <ModalBackdrop isOpen={isOpen} onClick={openModal}>
//         <Container>
//           <BtnClose onClick={openModal}> </BtnClose>
//           <Connectors>
//             <ConnectorsItem>
//               <BtnConnector onClick={() => setProvider("injected")}>
//                 <LogoWallet src={metamask} alt="MetaMask logo" />
//                 <Span> MetaMask</Span>
//               </BtnConnector>
//             </ConnectorsItem>

//             <ConnectorsItem>
//               <BtnConnector onClick={() => setProvider("walletconnect")}>
//                 <LogoWallet src={walletConnectIcon} alt="WalletConnect logo" />
//                 <Span> WalletConnect</Span>
//               </BtnConnector>
//             </ConnectorsItem>
//             <ConnectorsItem>
//               <BtnConnector onClick={() => setProvider("coinbaseWallet")}>
//                 <LogoWallet src={coinbaseWallet} alt="coinbaseWallet logo" />
//                 <Span> Coinbase Wallet</Span>
//               </BtnConnector>
//             </ConnectorsItem>
//             <ConnectorsItem>
//               <BtnConnector onClick={() => setProvider("fortmatic")}>
//                 <LogoWallet src={formaticIcon} alt="fortmatic logo" />
//                 <Span> Fortmatic</Span>
//               </BtnConnector>
//             </ConnectorsItem>
//           </Connectors>
//         </Container>
//       </ModalBackdrop>
//     </>
//   );
// };
