import React, { useState, useEffect } from "react";
// import { NoBscProviderError } from '@binance-chain/bsc-connector'
// import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import useAuth from "./components/hooks/useAuth";
import { useWeb3React } from "@web3-react/core";

import ConnectModal from "./components/WalletModal/ConnectModal";

const App = () => {
  const { login } = useAuth();
  const { chainId, account } = useWeb3React();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.log("chainIdc", chainId);
    console.log("account", account);
  }, [chainId, account, open]);

  return (
    <>
      <button onClick={openModal}>
        <>Connect Wallet</>
      </button>
      {open && <ConnectModal login={login} onDismiss={openModal} />}
      <p>chainId={chainId}</p>
      <p>account={account}</p>
    </>
  );
};

export default App;
