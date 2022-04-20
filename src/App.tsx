import { useEffect } from "react";
import { ConnectButton, setStyles, useSignMessage } from "tech-web3-connector";

const modalStyles = {
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: { color: "color" }, // example code
};

const App = () => {
  setStyles(modalStyles);
  // const { signMessage, isVerify } = useSignMessage();

  // useEffect(() => {
  //   if (!isVerify) {
  //     signMessage("TEST");
  //   }
  // }, [isVerify]);

  return (
    <>
      <ConnectButton />
    </>
  );
};
export default App;
