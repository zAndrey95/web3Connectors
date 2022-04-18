import { ConnectButton } from "../src/walletHooks/component/ButtonConnect/connectButton";
import styled from "styled-components";
import { ModalConnectors } from "./walletHooks/component/Modal/ModalConnectors";

const App = () => {
  return (
    <>
      <ConnectButton />
      <ModalConnectors />
    </>
  );
};

export default App;
