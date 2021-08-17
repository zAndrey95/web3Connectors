// import useBNBorETH from './useBNBorETH'
// import { ChainId } from 'nimbus-swap-mod/sdk';
const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
  BSC_TESTNET: 97,
  BSC_MAINNET: 56,
};

export default function useTokenList(chainId) {
  // const chainToken = useBNBorETH();
  const chainToken = () => (chainId === 97 || chainId === 56 ? 'BNB' : 'ETH');

  const TOKENS = {
    ETH: {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: './images/ethereum-eth-logo.png',
      decimal: '18',
      scale: '6',
      id: 1,
      bsc: 'BNB',
    },
    WETH: {
      name: 'Wrapped ETH',
      symbol: 'WETH',
      icon: './images/wrapped-ethereum-weth-logo.png',
      decimal: '18',
      scale: '6',
      bsc: 'WBNB',
      address: {
        [ChainId.MAINNET]: process.env.REACT_APP_WETH_TOKEN_MAINNET,
        [ChainId.ROPSTEN]: process.env.REACT_APP_WETH_TOKEN_ROPSTEN,
        [ChainId.RINKEBY]: process.env.REACT_APP_WETH_TOKEN_RINKEBY,
        [ChainId.GÖRLI]: process.env.REACT_APP_WETH_TOKEN_GÖRLI,
        [ChainId.KOVAN]: process.env.REACT_APP_WETH_TOKEN_KOVAN,
        [ChainId.BSC_TESTNET]: '0xA2CA18FC541B7B101c64E64bBc2834B05066248b',
        [ChainId.BSC_MAINNET]: '0xA2CA18FC541B7B101c64E64bBc2834B05066248b',
      },
      id: 2,
    },
    /*  WBTC: {
       name: 'Wrapped BTC',
       symbol: 'WBTC',
       icon: './images/wrapped-bitcoin-wbtc-logo.png',
       decimal: '8',
       scale: '6',
       address: {
         [ChainId.MAINNET]: process.env.REACT_APP_WBTC_TOKEN_MAINNET,
         [ChainId.ROPSTEN]: process.env.REACT_APP_WBTC_TOKEN_ROPSTEN,
         [ChainId.RINKEBY]: process.env.REACT_APP_WBTC_TOKEN_RINKEBY,
         [ChainId.GÖRLI]: process.env.REACT_APP_WBTC_TOKEN_GÖRLI,
         [ChainId.KOVAN]: process.env.REACT_APP_WBTC_TOKEN_KOVAN
       },
       id: 3
     }, */
    USDT: {
      name: 'Tether USDT',
      symbol: 'USDT',
      icon:
        chainToken() === 'ETH'
          ? './images/tether-usdt-logo.png'
          : './images/busd.png',
      decimal: chainToken() === 'ETH' ? '6' : '18',
      scale: '4',
      bsc: 'BUSD',
      address: {
        [ChainId.MAINNET]: process.env.REACT_APP_USDT_TOKEN_MAINNET,
        [ChainId.ROPSTEN]: process.env.REACT_APP_USDT_TOKEN_ROPSTEN,
        [ChainId.RINKEBY]: process.env.REACT_APP_USDT_TOKEN_RINKEBY,
        [ChainId.GÖRLI]: process.env.REACT_APP_USDT_TOKEN_GÖRLI,
        [ChainId.KOVAN]: process.env.REACT_APP_USDT_TOKEN_KOVAN,
        [ChainId.BSC_TESTNET]: '0x8f19d1A7596F5c81ce01718f395C640908990536',
        [ChainId.BSC_MAINNET]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      },
      id: 4,
    },
    NBU: {
      name: 'Nimbus',
      symbol: 'NBU',
      icon: './images/NUS_w.svg',
      decimal: '18',
      scale: '2',
      bsc: 'NBU',
      address: {
        [ChainId.MAINNET]: process.env.REACT_APP_NBU_TOKEN_CONTRACT,
        [ChainId.ROPSTEN]: process.env.REACT_APP_NBU_TOKEN_CONTRACT_ROPSTEN,
        [ChainId.RINKEBY]: process.env.REACT_APP_NBU_TOKEN_CONTRACT_RINKEBY,
        [ChainId.GÖRLI]: process.env.REACT_APP_NBU_TOKEN_CONTRACT_GÖRLI,
        [ChainId.KOVAN]: process.env.REACT_APP_NBU_TOKEN_CONTRACT_KOVAN,
        [ChainId.BSC_TESTNET]: '0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
        [ChainId.BSC_MAINNET]: '0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
      },
      id: 5,
    },
    GNBU: {
      name: 'Nimbus',
      symbol: 'GNBU',
      icon: './images/gnbu.svg',
      decimal: '18',
      scale: '2',
      bsc: 'GNBU',
      address: {
        [ChainId.MAINNET]: process.env.REACT_APP_GNBU_TOKEN_CONTRACT,
        [ChainId.ROPSTEN]: process.env.REACT_APP_GNBU_TOKEN_CONTRACT,
        [ChainId.RINKEBY]: process.env.REACT_APP_GNBU_TOKEN_CONTRACT,
        [ChainId.GÖRLI]: process.env.REACT_APP_GNBU_TOKEN_CONTRACT,
        [ChainId.KOVAN]: process.env.REACT_APP_GNBU_TOKEN_CONTRACT,
        [ChainId.BSC_TESTNET]: '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
        [ChainId.BSC_MAINNET]: '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
      },
      id: 6,
    },
  };

  return TOKENS;
}
