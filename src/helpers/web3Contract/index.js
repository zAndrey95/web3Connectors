import { networks } from '../../constants/networks'
import Web3 from 'web3'
// import { ChainId } from 'nimbus-swap-mod/sdk/dist'
// import { EChainId } from '../../types/web3Contract'

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
