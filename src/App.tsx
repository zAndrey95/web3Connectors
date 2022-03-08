// @ts-nocheck
import React, { useState, useEffect } from "react";
import useAuth from "./components/hooks/useAuth";
// import { useWeb3React } from "@web3-react/core";
import { isMobile } from "react-device-detect";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";
// import { getAlternativeProvider } from "./components/util/helpers";

import ConnectModal from "./components/WalletModal/ConnectModal";

const App = () => {
  // const { chainId } = useWeb3React();
  const web3 = new Web3(Web3.givenProvider);
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("");
  const [chainID, setChainID] = useState("");

  const openModal = () => {
    setOpen(!open);
  };

  const getUserInfo = async () => {
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    setChainID(chainId);
    setAccount(accounts);
  };

  useEffect(() => {
    getUserInfo();
  }, [account, chainID]);

  useEffect(() => {}, [open]);

  const trans = () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      connector.createSession();
    }
    connector.on("connect", (error) => {
      if (error) {
        throw error;
      }
    });
    connector.on("session_update", (error) => {
      if (error) {
        throw error;
      }
    });

    connector.on("disconnect", (error) => {
      if (error) {
        throw error;
      }
    });
  };

  return (
    <>
      {isMobile ? (
        <button onClick={trans}>
          <>Connect Wallet mob</>
        </button>
      ) : (
        <button onClick={openModal}>
          <>Connect Wallet PC</>
        </button>
      )}
      {open && <ConnectModal login={login} onDismiss={openModal} />}

      <p>chainId={account.length > 0 ? chainID : ""}</p>
      <p>account={account}</p>
    </>
  );
};

export default App;
