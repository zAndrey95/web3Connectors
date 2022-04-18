// @ts-nocheck
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

const ChainId = {
  MAINNET: 1,
  ROPSTEN: 2,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
};

const RPC = {
  [ChainId.MAINNET]:
    "https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  [ChainId.ROPSTEN]:
    "https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  [ChainId.RINKEBY]:
    "https://rinkeby.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  [ChainId.GÖRLI]:
    "https://goerly.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  [ChainId.KOVAN]:
    "https://kovan.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  [ChainId.BSC_MAINNET]: "https://bsc-dataseed.binance.org/",
  [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-2-s3.binance.org:8545",
};

const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
  rpc: RPC,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  //@ts-ignore
  pollingInterval: 12000,
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

const fortmatic = new FortmaticConnector({
  //Test Rinkeby, Kovan, Ropsten : pk_test_5738055D79822432
  //Production localhost : pk_live_5ECD887F1C653961
  apiKey: "pk_test_5738055D79822432",
  chainId: 1,
});

export const connectors: any = {
  injected: injected,
  walletconnect: walletconnect,
  coinbaseWallet: walletlink,
  fortmatic: fortmatic,
};
