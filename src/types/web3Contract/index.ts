export type TContractVariant = 'nbu' | 'gnbu' | 'router' | 'initialSale' | 'wrapNBU' | 'wrapGNBU'

export type TContracts = {
  nbu: string
  gnbu: string
  router: string
  routerTest?: string
  initialSale: string
  wrapNBU: string
  wrapGNBU: string
  wrapNBUTest?: string
  wrapGNBUTest?: string
}

export type TAbi = {
  nbu: any
  gnbu: any
  router: any
  routerTest?: any
  initialSale: any
  wrapNBU: any
  wrapGNBU: any
  wrapNBUTest?: any
  wrapGNBUTest?: any
}

export type TWeb3ContractContext = {
  web3?: any
  getContract: (contract: TContractVariant) => any
}

export enum EChainId {
    MAIN_ETH = 1,
    TEST_ETH = 3,
    MAIN_BSC = 56,
    TEST_BSC = 97
}