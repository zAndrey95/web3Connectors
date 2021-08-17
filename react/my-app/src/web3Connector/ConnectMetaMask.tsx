// @ts-nocheck
import React, { useEffect } from 'react';
import Web3 from 'web3';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { isMobile } from 'react-device-detect'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { injected } from './connectors'
import { normalizeEth, normalizeAccount } from './utils';

import { getAlternativeProvider } from './helpers';

const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    // iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  }
}

const ConnectMetaMask: (account?: any, setAccount?: any) => any = ({ account, setAccount }) => {
  const { activate, account: accWeb3, chainId } = useWeb3React()

  const accountsChanged = (acc: any) => {
    console.log('accountsChanged', window.web3.currentProvider)
    // window.web3 = new Web3(window.web3.currentProvider);
    setAccount && setAccount({
      ...account,
      account: acc[0],
    });

  }

  const chainChanged = (chainId: any) => {
    console.log('chainChanged', window.web3.currentProvider)
    // window.web3 = new Web3(window.web3.currentProvider);
    setAccount({
      ...account,
      chainId: +chainId,
    });

  }

  const getUserInfo = async () => {
    const web3 = new Web3(Web3.givenProvider || getAlternativeProvider(chainId))
      // if (chainId === 1) {
      //   web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d')
      // } else if (chainId === 3) {
      //   web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d')
      // } else if (chainId === 97) {
      //   web3 = new Web3(Web3.givenProvider || 'https://data-seed-prebsc-2-s3.binance.org:8545')
      // } else if (chainId === 56) {
      //   web3 = new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org')
      // }
    const balance = await web3.eth.getBalance(accWeb3)
    setAccount && setAccount({
      ...account,
      account: accWeb3,
      sponsorId: 0,
      chainId: chainId,
      balance: web3.utils.fromWei(balance, "ether"),
    });
  }

  useEffect(() => {
    accWeb3 && getUserInfo()
  }, [accWeb3])

  const onConnect = async (connector: any) => {
    if(isMobile) {
      const connector = new WalletConnect({
        bridge: "https://uniswap.bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });

      if (!connector.connected) {
        connector.createSession();
      }

      if(connector.connected) {
        connector.killSession();
      }

      connector.on("connect", async (error, payload) => {
        if (error) {
          throw error;
        }

        const { chainId } = payload.params[0];

        let web3 = new Web3(Web3.givenProvider || getAlternativeProvider(chainId))

        window.web3 = web3;
        // const a = await window.web3.eth.getChainId()
        // alert(a)
        // alert(JSON.stringify(await window.web3.eth.getAccounts()))
        const balance = await web3.eth.getBalance(connector.accounts[0])
        setAccount({
          account: connector.accounts[0],
          sponsorId: 0,
          chainId: chainId,
          balance: window.web3.utils.fromWei(balance, "ether"),
        });
      });
    } else {
      let name = ''
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name)
        }
        return true
      })
  
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
      connector &&
        activate(connector, undefined, true)
          .catch((error) => {
            if (error instanceof UnsupportedChainIdError) {
              console.log(`${chainId}`)
              activate(connector) // a little janky...can't use setError because the connector isn't set
            } else {
              console.log('error', true)
            }
          })
        }
    // console.log("onConnect");
    // if (typeof web3 !== 'undefined') {
    //   window.web3 = new Web3(window.web3.currentProvider);
    //   const accountsMetaMask = await window.ethereum.request({
    //     method: 'eth_requestAccounts',
    //   });

    //   if (window.web3.currentProvider.isMetaMask === true) {
    //     window.web3.eth.getAccounts(async (error, accounts) => {
    //       console.log('accounts', accounts);
    //       if (accounts.length === 0) {
    //         console.error('there is no active accounts in MetaMask');
    //       } else {
    //         const balance = await window.web3.eth.getBalance(accounts[0]);
    //         // --- Serzh108
    //         const chainId = await window.web3.eth.getChainId();
    //         setAccount({
    //           account: accounts[0],
    //           sponsorId: Math.floor(Math.random() * 100),
    //           balance: window.web3.utils.fromWei(balance, "ether"),
    //           chainId
    //         });
    //         return true;
    //       }
    //     });
    //   } else {
    //     console.error('Another web3 provider');
    //   }
    // } else {
    //   console.error('No web3 provider');
    // }
    // setAccount({
    //   account: '',
    //   sponsorId: 0,
    //   balance: 0,
    //   chainId: 0,
    // });
    // return false;
  }

  useEffect(() => {
    window.addEventListener('load', async () => {
      await onConnect();
    });

    if(window.ethereum) {
      window.ethereum.on('chainChanged', chainChanged);
      window.ethereum.on('accountsChanged', accountsChanged);
    }
  });

  return (
    <>
      {!account?.account && (
        <button onClick={() => onConnect(SUPPORTED_WALLETS.METAMASK.connector)}>Connect to a Wallet</button>
      )}
      {account?.account && (
        <>
        <div >
          <span>
            {normalizeEth(account.balance)} {[56, 97].includes(account.chainId) ? 'BNB' : 'ETH'}
          </span>
          <span >
            {normalizeAccount(account.account)}
          </span>
        </div>
        <span >
          {normalizeAccount(account.account)}
        </span>
        </>
      )}
    </>
  );
};

export default ConnectMetaMask;
