import * as React from 'react'
import { useEffect, useState } from 'react'
import { getConfig } from '../config'
import { createClient, createNWClient } from '../services/keplr'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Coin, SigningStargateClient } from '@cosmjs/stargate'
import { OfflineSigner } from '@cosmjs/proto-signing'

interface WalletContextType {
  readonly initialized: boolean
  readonly init: (signer: OfflineSigner) => void
  readonly clear: () => void
  readonly address: string
  readonly name: string
  readonly balance: readonly Coin[]
  readonly refreshBalance: () => Promise<void>
  readonly getClient: () => SigningCosmWasmClient
  readonly getNoWASMClient: () => SigningStargateClient
  readonly getSigner: () => OfflineSigner
  readonly updateSigner: (singer: OfflineSigner) => void
  readonly network: string
  readonly setNetwork: (network: string) => void
}

function throwNotInitialized(): any {
  throw new Error('Not yet initialized')
}

const defaultContext: WalletContextType = {
  initialized: false,
  init: throwNotInitialized,
  clear: throwNotInitialized,
  address: '',
  name: '',
  balance: [],
  refreshBalance: throwNotInitialized,
  getClient: throwNotInitialized,
  getNoWASMClient: throwNotInitialized,
  getSigner: throwNotInitialized,
  updateSigner: throwNotInitialized,
  network: '',
  setNetwork: throwNotInitialized,
}

export const WalletContext =
  React.createContext<WalletContextType>(defaultContext)

export const useWallet = (): WalletContextType =>
  React.useContext(WalletContext)

export function WalletProvider({
  children,
  network,
  setNetwork,
}: any): JSX.Element {
  const [signer, setSigner] = useState<OfflineSigner>()
  const [client, setClient] = useState<SigningCosmWasmClient>()
  const [nwclient, setNWClient] = useState<SigningStargateClient>()
  const config = getConfig(network)

  const contextWithInit = {
    ...defaultContext,
    init: setSigner,
    network,
    setNetwork,
  }
  const [value, setValue] = useState<WalletContextType>(contextWithInit)

  const clear = (): void => {
    setValue({ ...contextWithInit })
    setClient(undefined)
    setNWClient(undefined)
    setSigner(undefined)
  }

  // Get balance for each coin specified in config.coinMap
  async function refreshBalance(
    address: string,
    balance: Coin[]
  ): Promise<void> {
    if (!client) return

    balance.length = 0
    for (const denom in config.coinMap) {
      const coin = await client.getBalance(address, denom)
      if (coin) balance.push(coin)
    }

    setValue({ ...value, balance })
  }

  const updateSigner = (signer: OfflineSigner) => {
    setSigner(signer)
  }

  useEffect(() => {
    if (!signer) return
    ;(async function updateClient(): Promise<void> {
      try {
        const client = await createClient(signer, network)
        const nclient = await createNWClient(signer, network)
        setNWClient(nclient)
        setClient(client)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [signer])

  useEffect(() => {
    if (!signer || !client || !nwclient) return

    const balance: Coin[] = []

    ;(async function updateValue(): Promise<void> {
      const address = (await signer.getAccounts())[0].address

      const anyWindow: any = window
      const key = await anyWindow.keplr.getKey(config.chainId)

      await refreshBalance(address, balance)

      localStorage.setItem('wallet_address', address)

      setValue({
        initialized: true,
        init: () => {},
        clear,
        address,
        name: key.name || '',
        balance,
        refreshBalance: refreshBalance.bind(null, address, balance),
        getClient: () => client,
        getNoWASMClient: () => nwclient,
        getSigner: () => signer,
        updateSigner,
        network,
        setNetwork,
      })
    })()
  }, [client])

  useEffect(() => {
    setValue({ ...value, network })
  }, [network])

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}
