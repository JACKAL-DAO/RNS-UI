import { useTheme } from 'contexts/theme'
import { NextPage } from 'next'
import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'
import { useWallet } from 'contexts/wallet'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Airdrop: NextPage = () => {
  const theme = useTheme()
  const wallet = useWallet()
  const [mintLoading, setMintLoading] = useState(false)

  const checkTaken = (address: String) => {
    console.log(address)
  }

  const registerName = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target.nmval.value)
    console.log(wallet)

    const client = wallet.getClient()

    const contractAddress: string = String(
      process.env.NEXT_PUBLIC_ENV_CONTRACT_ADDRESS
    )

    const msg = {}

    client
      .execute(wallet.address, contractAddress, msg, 'auto')
      .then(() => {
        setMintLoading(false)
        toast.success('Name Registered!', {
          style: { maxWidth: 'none' },
        })
      })
      .catch((err: any) => {
        setMintLoading(false)
        toast.error(err.message, { style: { maxWidth: 'none' } })
      })
    return false
  }

  return (
    <div className="h-4/4 w-3/4">
      <h1 className="text-6xl font-bold text-center">Register Domain Name</h1>
      <div className="my-6">
        <label className="block mb-2 text-lg font-bold text-gray-900 dark:text-gray-300 text-center">
          Domain Name
        </label>
        <form
          className="container mx-auto grid gap-4 grid-cols-4"
          onSubmit={registerName}
        >
          <input
            name="nmval"
            id="nmval"
            type="text"
            className="col-span-3 bg-gray-50 border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'Enter name you wish to register'}
            onChange={(e) => checkTaken(e.target.value)}
          />
          <button
            type="submit"
            className={`${theme.isDarkTheme ? 'bg-gray/10' : 'bg-dark-gray/10'}
            col-span-1 w-full p-3 rounded-md px-10 text-2xl block`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Airdrop
