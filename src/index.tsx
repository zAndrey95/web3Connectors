import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

import App from "./App";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}


if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
        <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
