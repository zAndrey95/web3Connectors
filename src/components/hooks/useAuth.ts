import { useCallback } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { connectorLocalStorageKey } from "../WalletModal/config";
import { ConnectorNames } from "../WalletModal/types";
import { connectorsByName } from "../util/web3React";
import { setupNetwork } from "./wallet";

const useAuth = () => {
  const { activate } = useWeb3React();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              console.log("error 1", error);
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              console.log("error 2 massage useAuth");
            } else {
              console.log("error 3 massage useAuth");
            }
          }
        });
      } else {
        console.log("error 4 massage useAuth");
      }
    },
    [activate]
  );

  return { login };
};

export default useAuth;
