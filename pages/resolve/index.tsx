import { useTheme } from 'contexts/theme'
import { NextPage } from 'next'
import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'
import { useWallet } from 'contexts/wallet'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Coin } from "@cosmjs/stargate";

const Airdrop: NextPage = () => {
  const theme = useTheme()
  const wallet = useWallet()
  const [mintLoading, setMintLoading] = useState(false)

  const checkTaken = (address: String) => {
    console.log(address)
  }

  const registerName = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (e.target.nmval.value.length < 1) {
      toast.error("Must enter a name!", { style: { maxWidth: 'none' } })
      return false;
    }

    const client = wallet.getClient()

    const contractAddress: string = String(
      process.env.NEXT_PUBLIC_ENV_CONTRACT_ADDRESS
    )

    let nm = e.target.nmval.value;
    const msg = { resolve_name: { name: nm } }

    client
      .queryContractSmart(contractAddress, msg)
      .then((response) => {
        e.target.addr.value = response.owner;
        setMintLoading(false)
        console.log(response.owner)
        toast.success("Resolved name.", {
          style: { maxWidth: 'none' },
        })
      })
      .catch((err: any) => {
        setMintLoading(false)
        toast.error(err.message, { style: { maxWidth: 'none' } })
        console.error(err);
      })
    return false
  }

  return (
    <div className="h-4/4 w-3/4">
      <h1 className="text-6xl font-bold text-center">Resolve Domain Name</h1>
      <div className="my-6">
        <form
          className="container mx-auto grid gap-4 grid-cols-12 justify-items-center items-center"
          onSubmit={registerName}
        >

          <div
            className='col-span-5 h-full w-full block grid grid-cols-8'
          >
            <input
              name="nmval"
              id="nmval"
              type="text"
              className="col-span-7 h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-lg px-4 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Enter name you wish to resolve'}
              onChange={(e) => checkTaken(e.target.value)}
            />
            <div
              className="col-span-1 text-2xl block h-full w-full text-left rounded-r-md bg-white text-black grid items-center"
              style={{ marginLeft: "-10px", paddingLeft: "10px" }}
            >
              <label
                htmlFor="nmval"
                className='col-span-1'
              >
                .rns
              </label>
            </div>

          </div>


          <button
            type="submit"
            className={`${theme.isDarkTheme ? 'bg-gray/10' : 'bg-dark-gray/10'}
            col-span-1 h-full p-3 rounded-md text-2xl block`}
          >
            Resolve
          </button>

          <input
            name="addr"
            id="addr"
            type="text"
            className="ml-4 col-span-6 h-full w-full box-border bg-gray-50 border-gray-300 text-black text-2xl rounded-lg px-4 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'Address'}
            onChange={(e) => checkTaken(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Airdrop
