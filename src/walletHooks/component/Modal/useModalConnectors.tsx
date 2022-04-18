import React from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../connectors";

export const useModalConnectors = () => {
  const { activate } = useWeb3React();

  const setProvider = (type: string) => {
    if (type) {
      window.localStorage.setItem("provider", type);
      if (type === "injected" && !window.web3 && !window.ethereum) {
        alert("Recommended to install MetaMask wallet https://metamask.io/ ");
      }
    }

    switch (type) {
      case "injected":
        activate(connectors.injected);
        break;
      case "walletconnect":
        activate(connectors.walletconnect);
        break;
      case "coinbaseWallet":
        activate(connectors.coinbaseWallet);
        break;
      case "fortmatic":
        activate(connectors.fortmatic);
        break;

      default:
        break;
    }
  };
  return { setProvider };
};
