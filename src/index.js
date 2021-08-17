import React from 'react';
import ReactDOM from 'react-dom';
import { Web3Provider } from '@ethersproject/providers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

import Web3ReactManager from './Web3ReactManager.jsx'
import ButtonConnect from './components/ConnectMetaMask'

import './index.css';

const NetworkContextName = 'NETWORK';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          <p>Test</p>
          <ButtonConnect />
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

