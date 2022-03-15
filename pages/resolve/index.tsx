import { useTheme } from 'contexts/theme'
import { NextPage } from 'next'
import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'
import { useWallet } from 'contexts/wallet'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Coin } from '@cosmjs/stargate'
import { resolveName } from 'utils/retriever'

const Airdrop: NextPage = () => {
  const theme = useTheme()
  const wallet = useWallet()
  const [mintLoading, setMintLoading] = useState(false)
  const [expires, setExpires] = useState('')
  const [avatar_url, setAvatarURL] = useState('')
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [twitter, setTwitter] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [instagram, setInstagram] = useState('')
  const [reddit, setReddit] = useState('')
  const [scrt, setSCRT] = useState('')
  const [cro, setCRO] = useState('')
  const [star, setSTAR] = useState('')
  const [pers, setPERS] = useState('')
  const [kava, setKAVA] = useState('')
  const [terra, setTERRA] = useState('')
  const [atom, setATOM] = useState('')
  const [osmo, setOSMO] = useState('')
  const [akash, setAKASH] = useState('')
  const [sif, setSIF] = useState('')
  const [certik, setCERTIK] = useState('')

  const checkTaken = (address: String) => {
    console.log(address)
  }

  const registerName = (e: React.ChangeEvent<HTMLFormElement>) => {
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

    let nm = e.target.nmval.value
    const msg = { resolve_attributes: { name: nm } }

    client
      .queryContractSmart(contractAddress, msg)
      .then((response) => {
        e.target.addr.value = response.name.owner
        formatResolve(response.name)
        setMintLoading(false)
        console.log(response.owner)
        toast.success('Resolved name.', {
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

  const formatResolve = (data: any) => {
    console.log(data)

    let expires = new Date(data.expires / 1000000)

    setExpires(expires.toLocaleString())
    setAvatarURL(data.avatar_url)
    setWebsite(data.website)
    setEmail(data.email)
    setTwitter(data.twitter)
    setTelegram(data.telegram)
    setDiscord(data.discord)
    setInstagram(data.instagram)
    setReddit(data.reddit)

    setSCRT(data.secret_address)
    setCRO(data.crypto_org_address)
    setKAVA(data.kava_address)
    setPERS(data.persistence_address)
    setSTAR(data.starname_address)
    setTERRA(data.terra_address)

    resolveName(data.id, 'atom').then((r) => {
      setATOM(r)
    })

    resolveName(data.id, 'osmo').then((r) => {
      setOSMO(r)
    })

    resolveName(data.id, 'akash').then((r) => {
      setAKASH(r)
    })

    resolveName(data.id, 'sif').then((r) => {
      setSIF(r)
    })

    resolveName(data.id, 'certik').then((r) => {
      setCERTIK(r)
    })
  }

  return (
    <div className="h-4/4 w-3/4">
      <h1 className="text-6xl font-bold text-center">Resolve Domain Name</h1>
      <div className="my-6">
        <form
          className="container mx-auto grid gap-x-2 gap-y-1 grid-cols-12 justify-items-center items-center"
          onSubmit={registerName}
        >
          <div className="col-span-5 h-full w-full block grid grid-cols-8">
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
              style={{ marginLeft: '-10px', paddingLeft: '10px' }}
            >
              <label htmlFor="nmval" className="col-span-1">
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
            readOnly
            className="ml-4 col-span-6 h-full w-full box-border bg-gray-50 border-gray-300 text-black text-2xl rounded-lg px-4 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'Address'}
          />

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="expires" className="col-span-1 bg-white">
                Expires
              </label>
            </div>
            <input
              name="expires"
              id="expires"
              type="text"
              readOnly
              value={expires}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Expiration Date'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="scrt" className="col-span-1 bg-white">
                Secret
              </label>
            </div>
            <input
              name="scrt"
              id="scrt"
              type="text"
              readOnly
              value={scrt}
              className="col-span-6 w-full h-full box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Secret Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="cro" className="col-span-1 bg-white">
                Crypto.org
              </label>
            </div>
            <input
              name="cro"
              id="cro"
              type="text"
              readOnly
              value={cro}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Crypto.org Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="kava" className="col-span-1 bg-white">
                Kava
              </label>
            </div>
            <input
              name="kava"
              id="kava"
              type="text"
              readOnly
              value={kava}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Kava Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="terra" className="col-span-1 bg-white">
                Terra
              </label>
            </div>
            <input
              name="terra"
              id="terra"
              type="text"
              readOnly
              value={terra}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Terra Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="pers" className="col-span-1 bg-white">
                Persistence
              </label>
            </div>
            <input
              name="pers"
              id="pers"
              type="text"
              readOnly
              value={pers}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Persistence Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="star" className="col-span-1 bg-white">
                Starname
              </label>
            </div>
            <input
              name="star"
              id="star"
              type="text"
              readOnly
              value={star}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Starname Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="atom" className="col-span-1 bg-white">
                Cosmos
              </label>
            </div>
            <input
              name="atom"
              id="atom"
              type="text"
              readOnly
              value={atom}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Cosmos Hub Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="atom" className="col-span-1 bg-white">
                Osmosis
              </label>
            </div>
            <input
              name="osmo"
              id="osmo"
              type="text"
              readOnly
              value={osmo}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Osmosis Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="akash" className="col-span-1 bg-white">
                Akash
              </label>
            </div>
            <input
              name="akash"
              id="akash"
              type="text"
              readOnly
              value={akash}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Akash Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="sif" className="col-span-1 bg-white">
                SifChain
              </label>
            </div>
            <input
              name="sif"
              id="sif"
              type="text"
              readOnly
              value={sif}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Sifchain Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="certik" className="col-span-1 bg-white">
                Certik
              </label>
            </div>
            <input
              name="certik"
              id="certik"
              type="text"
              readOnly
              value={certik}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Certik Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center  py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="avatar_url" className="col-span-1 bg-white">
                Avatar
              </label>
            </div>
            <input
              name="avatar_url"
              id="avatar_url"
              type="text"
              readOnly
              value={avatar_url}
              className="col-span-6 w-full h-full bg-gray-50 box-content border-gray-300 text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Avatar URL'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="website" className="col-span-1 bg-white">
                Website
              </label>
            </div>
            <input
              name="website"
              id="website"
              type="text"
              readOnly
              value={website}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Website URL'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="email" className="col-span-1 bg-white">
                E-Mail
              </label>
            </div>
            <input
              name="email"
              id="email"
              type="text"
              readOnly
              value={email}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Email Address'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="twitter" className="col-span-1 bg-white">
                Twitter
              </label>
            </div>
            <input
              name="twitter"
              id="twitter"
              type="text"
              readOnly
              value={twitter}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Twitter handle'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="telegram" className="col-span-1 bg-white">
                Telegram
              </label>
            </div>
            <input
              name="telegram"
              id="telegram"
              type="text"
              readOnly
              value={telegram}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Telegram handle'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="discord" className="col-span-1 bg-white">
                Discord
              </label>
            </div>
            <input
              name="discord"
              id="discord"
              type="text"
              readOnly
              value={discord}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'name#number'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="instagram" className="col-span-1 bg-white">
                Instagram
              </label>
            </div>
            <input
              name="instagram"
              id="instagram"
              type="text"
              readOnly
              value={instagram}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'Instagram handle'}
            />
          </div>

          <div className="col-span-6 h-full w-full block grid grid-cols-8">
            <div
              className="col-span-2 text-2xl block h-full w-full text-left rounded-l-md bg-white text-black grid items-center py-2"
              style={{ marginRight: '-20px', paddingLeft: '10px', zIndex: 2 }}
            >
              <label htmlFor="reddit" className="col-span-1 bg-white">
                Reddit
              </label>
            </div>
            <input
              name="reddit"
              id="reddit"
              type="text"
              readOnly
              value={reddit}
              className="col-span-6 h-full w-full bg-gray-50 box-content border-gray-300  text-black text-2xl rounded-r-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={'u/username'}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Airdrop
