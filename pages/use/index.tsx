import { useTheme } from 'contexts/theme'
import { NextPage } from 'next'
import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'
import { useWallet } from 'contexts/wallet'
import React, { useState, useEffect, KeyboardEvent } from 'react'
import toast from 'react-hot-toast'
import { Coin, SigningStargateClient } from '@cosmjs/stargate'
import { getConfig } from '../../config/network'
import { resolveName } from '../../utils/retriever'

const Airdrop: NextPage = () => {
  const theme = useTheme()
  const wallet = useWallet()
  const [mintLoading, setMintLoading] = useState(false)

  const registerName = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!wallet.initialized) {
      toast.error('Wallet not connected!', { style: { maxWidth: 'none' } })
      return false
    }

    if (e.target.nmval.value.length < 1) {
      toast.error('Must enter a name!', { style: { maxWidth: 'none' } })
      return false
    }

    let secret_id = await window.keplr.getKey('secret-4')
    secret_id = secret_id.bech32Address
    let cro = await window.keplr.getKey('crypto-org-chain-mainnet-1')
    cro = cro.bech32Address
    let iov = await window.keplr.getKey('iov-mainnet-ibc')
    iov = iov.bech32Address
    let pers = await window.keplr.getKey('core-1')
    pers = pers.bech32Address
    let kava = await window.keplr.getKey('kava-9')
    kava = kava.bech32Address

    let terra = await window.keplr.getKey('columbus-5')
    terra = terra.bech32Address

    let juno = await window.keplr.getKey('juno-1')
    juno = juno.bech32Address

    let coin: Coin = {
      denom: 'ujuno',
      amount: (parseFloat(e.target.amount.value) * 1000000).toString(),
    }
    console.log('yeah')
    let c = wallet.getNoWASMClient()
    setMintLoading(true)
    resolveName(e.target.nmval.value, 'juno')
      .then((address) => {
        c.sendTokens(wallet.address, address, [coin], 'auto')
          .then((r) => {
            setMintLoading(false)
            toast.success('Tokens Sent!', {
              style: { maxWidth: 'none' },
            })
          })
          .catch((e) => {
            setMintLoading(false)
            toast.error(e.message, { style: { maxWidth: 'none' } })
            console.error(e)
          })
      })
      .catch((e) => {
        toast.error(e.message, { style: { maxWidth: 'none' } })
        console.error(e)
      })
  }

  return (
    <div className="h-4/4 w-11/12 w-lg-3/4">
      <h1 className="text-6xl font-bold text-center">Send Juno</h1>
      <div className="my-6">
        <form
          className="container mx-auto grid gap-1 grid-cols-12 justify-items-center items-center"
          onSubmit={registerName}
        >
          <div className="col-span-6 h-full w-full block grid grid-cols-10">
            <input
              name="nmval"
              id="nmval"
              type="text"
              className="col-span-8 h-full w-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-lg px-4 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'RNS Name'}
            />
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-r-md bg-white text-black grid items-center"
              style={{ marginLeft: '-10px', paddingLeft: '10px' }}
            >
              <label htmlFor="nmval">.rns</label>
            </div>
          </div>

          <div className="col-span-4 h-full w-full block grid grid-cols-6">
            <input
              name="amount"
              id="amount"
              type="text"
              className="col-span-4 h-full w-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-lg px-4 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Amount'}
            />
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-r-md bg-white text-black grid items-center"
              style={{ marginLeft: '-10px', paddingLeft: '10px' }}
            >
              <label htmlFor="amount">Juno</label>
            </div>
          </div>

          <button
            type="submit"
            className={`${theme.isDarkTheme ? 'bg-gray/10' : 'bg-dark-gray/10'}
            col-span-2 w-full h-full p-3 rounded-md text-2xl block`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Airdrop
