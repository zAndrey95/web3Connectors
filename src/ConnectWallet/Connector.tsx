// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getAlternativeProvider } from "./helpers";
import { injected } from "./settingConnector";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
// import { isMobile } from "react-device-detect";
// import { UnsupportedChainIdError } from "@web3-react/core";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    // iconURL: METAMASK_ICON_URL,
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    connector: injected,
    name: "WalletConnect",
    // iconURL: WALLETCONNECT_ICON_URL,
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
};
//
const Connector = () => {
  const { account, chainId, activate } = useWeb3React();
  const [balance, setBalance] = useState("0.0");

  const getUserInfo = async (account: any) => {
    const web3 = new Web3(
      Web3.givenProvider || getAlternativeProvider(chainId)
    );
    if (account) {
      const balance = await web3.eth.getBalance(account);
      const numBalance: string = String(Number(balance) / 10 ** 18);
      setBalance(numBalance);
    }
  };

  useEffect(() => {
    if (account) {
      getUserInfo(account);
    }
    // eslint-disable-next-line
  }, [account, balance]);

  const onConnect = async (connector: string) => {
    if (!account) {
      if (connector !== SUPPORTED_WALLETS.METAMASK.name) {
        const connector = new WalletConnect({
          bridge: "https://uniswap.bridge.walletconnect.org",
          qrcodeModal: QRCodeModal,
        });

        if (!connector.connected) {
          connector.createSession();
        }

        if (connector.connected) {
          connector.killSession();
        }
      }
    }

    if (connector === SUPPORTED_WALLETS.METAMASK.name) {
      // activate(injected);
      activate(injected).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          console.log("error", error);
        }
      });
    }
  };

  return (
    <>
      <button onClick={() => onConnect("MetaMask")}>
        {account ? "Connect MM" : "connect wallet MM"}
      </button>
      <button onClick={() => onConnect("WalletConnect")}>
        {account ? "Connect only" : "connect wallet only"}
      </button>
      {account ? (
        <>
          <p>{account}</p>
          <p>{balance}</p>
          <p>{chainId}</p>
        </>
      ) : null}
    </>
  );
};

export default Connector;
