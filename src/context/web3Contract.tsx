import React, { FC, createContext, useEffect, useState } from 'react'
import Web3 from 'web3'
// import { useActiveWeb3React } from '../hooks'
// import { contractsBSC, contractsETH, abiBSC, abiETH } from 'constants/contracts/contracts'
import { getAlternativeProvider } from './../helpers/web3Contract'
import { TContractVariant, EChainId, TWeb3ContractContext } from '../types/web3Contract'

export const Web3ContractContext = createContext<TWeb3ContractContext>({
  getContract: () => {
    return
  }
})

interface TProps {
  children: React.ReactNode
  account: any
}

// const getContractValue = (contract: TContractVariant, isBSC: boolean, chainId: any) => {
//   let contractValue

//   if ((chainId as number) === EChainId.TEST_BSC || (chainId as number) === EChainId.TEST_ETH) {
//     const contractName: TContractVariant = `${contract}Test` as TContractVariant

//     contractValue = isBSC
//       ? contractsBSC[contractName] || contractsBSC[contract]
//       : contractsETH[contractName] || contractsETH[contract]
//   } else {
//     contractValue = isBSC ? contractsBSC[contract] : contractsETH[contract]
//   }

//   return contractValue
// }

// eslint-disable-next-line react/prop-types
export const Web3ContractProvider: FC<TProps> = ({ children, account }) => {
    const { chainId } = account
  const [web3, setWeb3] = useState<any>()
    console.log(chainId);
  useEffect(() => {
    if (chainId) {
      const provider = Web3.givenProvider || getAlternativeProvider(chainId)
      const newWeb3 = new Web3(provider)
      setWeb3(newWeb3)
    }
  }, [chainId])

  const getContract = () => {}
//   const getContract = (contract: TContractVariant) => {
//     if (!web3) return null
//     const isBSC = (chainId as number) === EChainId.TEST_BSC || (chainId as number) === EChainId.MAIN_BSC
//     const contractValue: string = getContractValue(contract, isBSC, chainId)

//     const abiValue: any = isBSC ? abiBSC[contract] : abiETH[contract]
//     const result = new web3.eth.Contract(abiValue, contractValue)

//     return result
//   }

  return (
    <Web3ContractContext.Provider
      value={{
        web3,
        getContract
      }}
    //   account
    >
      {children}
    </Web3ContractContext.Provider>
  )
}
