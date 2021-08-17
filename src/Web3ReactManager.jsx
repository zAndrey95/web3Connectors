import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'

import { network, injected } from './components/ConnectMetaMask/connectors'

const NetworkContextName = 'NETWORK'

export function useEagerConnect() {
    const { activate, active } = useWeb3React() // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false)
  
    useEffect(() => {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          if (isMobile && window.ethereum) {
            activate(injected, undefined, true).catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))
  
    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
      if (active) {
        setTried(true)
      }
    }, [active])
  
    return tried
  }
  
  /**
   * Use for network and injected - logs user in
   * and out after checking what network theyre on
   */
  export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React() // specifically using useWeb3React because of what this hook does
  
    useEffect(() => {
      const { ethereum } = window
  
      if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleChainChanged = () => {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error('Failed to activate after chain changed', error)
          })
        }
  
        const handleAccountsChanged = (accounts) => {
          if (accounts.length > 0) {
            // eat errors
            activate(injected, undefined, true).catch((error) => {
              console.error('Failed to activate after accounts changed', error)
            })
          }
        }
  
        ethereum.on('chainChanged', handleChainChanged)
        ethereum.on('accountsChanged', handleAccountsChanged)
  
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener('chainChanged', handleChainChanged)
            ethereum.removeListener('accountsChanged', handleAccountsChanged)
          }
        }
      }
      return undefined
    }, [active, error, suppress, activate])
  }

export default function Web3ReactManager({ children }) {
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)
  console.log('1')

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
        <div>
            Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
        </div>
    )
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    return showLoader ? (
      <div>
        Loading....
      </div>
    ) : null
  }

  return children
}
