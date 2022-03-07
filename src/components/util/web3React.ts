import { InjectedConnector } from "@web3-react/injected-connector"; // @ts-nocheck
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { ConnectorNames } from "../WalletModal/types";
// import { ConnectorNames } from '@pancakeswap/uikit'
import { hexlify } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings";
import { Web3Provider } from "@ethersproject/providers";
// import { useWeb3React } from "@web3-react/core";
// import { CHAIN_ID } from 'config/constants/networks'
// import getNodeUrl from "./getRpcUrl";


const POLLING_INTERVAL = 12000;
const rpcUrl = `https://bscscan.com/`;
const chainId = parseInt("56", 10);

// const injected = new InjectedConnector({ supportedChainIds: [chainId] });
 const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
})

// console.log("injected", injected);

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
// console.log("walletconnect", walletconnect);

const bscConnector = new BscConnector({ supportedChainIds: [chainId] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
};

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string
): Promise<string> => {
  // if (window.BinanceChain && connector instanceof BscConnector) {
  //   const { signature } = await window.BinanceChain.bnbSign(account, message);
  //   return signature;
  // }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = hexlify(toUtf8Bytes(message));
    const signature = await provider.provider?.wc.signPersonalMessage([
      wcMessage,
      account,
    ]);
    return signature;
  }

  return provider.getSigner(account).signMessage(message);
};
