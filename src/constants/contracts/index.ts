import { TContracts, TAbi } from '../../types/web3Contract'

import nbuAbi from '../../abis/nbuAbi.json'
// import gnbuAbi from '../proposals/gnbu.json'
// // import routerAbi from '../../abis/'
// import routerAbiBSC from '../abis/routerAbi-bsc.json'
// import routerAbiBSCmainnet from '../abis/routerAbi-bsc-mainnet.json'
// import wrapAbi from '../abis/wrap-ABI.json'
// import wrapAbiBSC from '../abis/wrap-BSC-ABI.json'
// import initialSaleAbi from '../abis/initialSaleAbi.json'
// import initialSaleAbiBSC from '../abis/initialSaleAbi-bsc.json'

export const contractsBSC: TContracts = { // need to check contracts
  nbu: '0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
  gnbu: '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
  router: '0x2C6cF65f3cD32a9Be1822855AbF2321F6F8f6b24',
  // routerTest: '',
  wrapNBU: '0xBFe52A0DBF40183bc5fC3220Dab2Db64BF19368E',
  wrapGNBU: '0xCaD011b3B79a3a83C576E6b2682049e296bE9374',
  initialSale: '0xb99f831a0a17ecD4221c907714B44A1931446832',
  wrapNBUTest: '0xD25969cf1c1930e4EB5b13007B09A5CFd02c16c8',
  wrapGNBUTest: '0xEe9628E882ee2929DF2de2c8Ca06b70aC9c211Aa'
}

export const contractsETH: TContracts = { // need to check contracts
  nbu: '0xEB58343b36C7528F23CAAe63a150240241310049',
  gnbu: '0x639ae8F3EEd18690bF451229d14953a5A5627b72',
  router: '0x05F6BB6b96ca657a3666d2f1bCA302b999a671b4',
  wrapNBU: '0xBFe52A0DBF40183bc5fC3220Dab2Db64BF19368E',
  wrapGNBU: '0xCaD011b3B79a3a83C576E6b2682049e296bE9374',
  initialSale: '0xEEA92913d8AA554a102ED5B4F0A6206E6D8d59D5',
  wrapNBUTest: '0x760d38b906034f114B46254d2516cD3995a2680f',
  wrapGNBUTest: '0x988Ff123073eA1374Ec999Eabd5F9Bb4Ba3c5399'
}

// export const abiBSC: TAbi = {
//   nbu: nbuAbi,
//   gnbu: gnbuAbi,
//   router: routerAbiBSCmainnet,
//   routerTest: routerAbiBSC,
//   initialSale: initialSaleAbiBSC,
//   wrapNBU: wrapAbiBSC,
//   wrapGNBU: wrapAbiBSC,
//   wrapNBUTest: wrapAbiBSC,
//   wrapGNBUTest: wrapAbiBSC
// }

// export const abiETH: TAbi = {
//   nbu: nbuAbi,
//   gnbu: gnbuAbi,
//   router: routerAbi,
//   initialSale: initialSaleAbi,
//   wrapNBU: wrapAbi,
//   wrapGNBU: wrapAbi,
//   wrapNBUTest: wrapAbi,
//   wrapGNBUTest: wrapAbi
// }
