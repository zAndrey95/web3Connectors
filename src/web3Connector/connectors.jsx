import { InjectedConnector } from '@web3-react/injected-connector'

import { NetworkConnector } from './NetworkConnector.ts'


const NETWORK_URLS = {
    1: `https://mainnet.infura.io/v3/099fc58e0de9451d80b18d7c74caa7c1`,
    3: `https://ropsten.infura.io/v3/099fc58e0de9451d80b18d7c74caa7c1`,
    97: 'https://data-seed-prebsc-2-s3.binance.org:8545',
    56: 'https://bsc-dataseed.binance.org',
}

export const network = new NetworkConnector({
    urls: NETWORK_URLS,
    defaultChainId: 1,
  })

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
  })