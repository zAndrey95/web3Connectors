// import { networks } from '../../constants/networks'
import Web3 from 'web3'
// import { ChainId } from 'nimbus-swap-mod/sdk/dist'
// import { EChainId } from '../../types/web3Contract'

export const networks = {
  eth_main: 'https://mainnet.infura.io/v3/7d9d43def2584f2a9f01f2a4719327bc',
  eth_test: 'https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
  bsc_main: 'https://bsc-dataseed.binance.org/',
  bsc_test: 'https://data-seed-prebsc-2-s3.binance.org:8545'
}

export const getAlternativeProvider = (chainId) => {
    let provider

    switch (chainId) {
      case 97:
        provider = networks.bsc_test
        break
      case 56:
        provider = networks.bsc_main
        break
      case 1:
        provider = networks.eth_main
        break
      case 3:
        provider = networks.eth_test
        break
      default:
        provider = Web3.givenProvider
        break
    }
    return provider
}
