import { useTheme } from 'contexts/theme'
import { NextPage } from 'next'
import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'
import { useWallet } from 'contexts/wallet'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Coin } from '@cosmjs/stargate'

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

    const client = wallet.getClient()

    const contractAddress: string = String(
      process.env.NEXT_PUBLIC_ENV_CONTRACT_ADDRESS
    )



    const msg = {
      withdraw_balance: {

      },
    }

    console.log(contractAddress)
    client
      .execute(
        wallet.address,
        contractAddress,
        msg,
        'auto',
        "",
      )
      .then((res) => {
        setMintLoading(false)
        console.log(res);
        toast.success('Balance Withdrawn!', {
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
      <h1 className="text-6xl font-bold text-center">Withdraw Contract Balance</h1>
      <div className="my-6">
        <form
          className="container mx-auto grid gap-1 grid-cols-5 justify-items-center items-center"
          onSubmit={registerName}
        >


          <button
            type="submit"
            className={`${theme.isDarkTheme ? 'bg-gray/10' : 'bg-dark-gray/10'}
            col-start-3 col-span-1 h-full p-3 rounded-md text-2xl block`}
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  )
}

export default Airdrop
