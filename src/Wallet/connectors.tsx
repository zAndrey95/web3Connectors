import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const RPC = {
  1: `https://mainnet.infura.io/v3/cb067f7f5bbf474f89385c37cf413a14`,
  3: `https://ropsten.infura.io/v3/099fc58e0de9451d80b18d7c74caa7c1`,
  56: "https://bsc-dataseed.binance.org",
  97: "https://data-seed-prebsc-2-s3.binance.org:8545",
};

const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
  rpc: RPC,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

const walletlink = new WalletLinkConnector({
  url: `https://bsc-dataseed.binance.org/`,
  appName: "walletlink",
});

const injected = new InjectedConnector({
  //@ts-ignore
  rpc: RPC,
  appName: "wallet injected",
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
});

export const connectors: any = {
  injected: injected,
  walletconnect: walletconnect,
  coinbaseWallet: walletlink,
};
