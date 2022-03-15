import { useTheme } from 'contexts/theme'
import { NextPage } from 'next'
import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'
import { useWallet } from 'contexts/wallet'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Coin } from '@cosmjs/stargate'

declare global {
  interface Window {
    keplr: any
  }
}

const Airdrop: NextPage = () => {
  const theme = useTheme()
  const wallet = useWallet()
  const [mintLoading, setMintLoading] = useState(false)

  const checkTaken = (address: String) => {
    console.log(address)
  }

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

    const client = wallet.getClient()

    const contractAddress: string = String(
      process.env.NEXT_PUBLIC_ENV_CONTRACT_ADDRESS
    )

    let years = parseInt(e.target.years.value)
    let nm = e.target.nmval.value
    const msg = { add_time: { name: nm, years: years } }

    let cost = 156250

    switch (nm.length) {
      case 1:
        cost = 5000000
        break
      case 2:
        cost = 2500000
        break
      case 3:
        cost = 1250000
        break
      case 4:
        cost = 625000
        break
      case 5:
        cost = 312500
        break
      default:
        cost = 156250
        break
    }

    cost = cost * years

    let juno: Coin = {
      denom: 'ujunox',
      amount: cost.toString(),
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

    let funds: Coin[] = [juno]

    console.log(contractAddress)
    client
      .execute(
        wallet.address,
        contractAddress,
        msg,
        'auto',
        `Extending Name: ${nm}`,
        funds
      )
      .then(() => {
        setMintLoading(false)
        toast.success('Duration Extended!', {
          style: { maxWidth: 'none' },
        })
      })
      .catch((err: any) => {
        setMintLoading(false)
        toast.error(err.message, { style: { maxWidth: 'none' } })
        console.error(err)
      })
    return false
  }

  const overwriteName = async (e: React.ChangeEvent<HTMLFormElement>) => {
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

    const client = wallet.getClient()

    const contractAddress: string = String(
      process.env.NEXT_PUBLIC_ENV_CONTRACT_ADDRESS
    )

    let nm = e.target.nmval.value

    const msg = {
      update_params: {
        name: nm,
        terra_address: terra,
        secret_address: secret_id,
        crypto_org_address: cro,
        kava_address: kava,
        persistence_address: pers,
        starname_address: iov,
        avatar_url:
          e.target.avatar_url.value.length > 0
            ? e.target.avatar_url.value
            : null,
        website:
          e.target.website.value.length > 0 ? e.target.website.value : null,
        email: e.target.email.value.length > 0 ? e.target.email.value : null,
        twitter:
          e.target.twitter.value.length > 0 ? e.target.twitter.value : null,
        telegram:
          e.target.telegram.value.length > 0 ? e.target.telegram.value : null,
        discord:
          e.target.discord.value.length > 0 ? e.target.discord.value : null,
        instagram:
          e.target.instagram.value.length > 0 ? e.target.instagram.value : null,
        reddit: e.target.reddit.value.length > 0 ? e.target.reddit.value : null,
      },
    }

    console.log(contractAddress)
    client
      .execute(
        wallet.address,
        contractAddress,
        msg,
        'auto',
        `Updating name: ${nm}`
      )
      .then(() => {
        setMintLoading(false)
        toast.success('Name Updated!', {
          style: { maxWidth: 'none' },
        })
      })
      .catch((err: any) => {
        setMintLoading(false)
        toast.error(err.message, { style: { maxWidth: 'none' } })
        console.error(err)
      })
    return false
  }

  return (
    <div className="h-4/4 w-3/4">
      <h1 className="text-6xl font-bold text-center">How To Video</h1>
      <div className="my-6">
        <iframe
          className="rounded-lg"
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </div>
  )
}

export default Airdrop
