import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'contexts/wallet'
import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ImArrowUpRight2, ImGithub, ImTwitter } from 'react-icons/im'
import { FiMoon, FiSun, FiBox } from 'react-icons/fi'
import { SiDiscord, SiTelegram } from 'react-icons/si'
import { BiWallet } from 'react-icons/bi'
import { useTheme } from 'contexts/theme'
import getShortAddress from 'utils/getShortAddress'
import { loadKeplrWallet, useKeplr } from 'services/keplr'
import { useRouter } from 'next/router'
import { getConfig } from 'config'

const Sidebar: NextPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const wallet = useWallet()
  const keplr = useKeplr()

  const activeColor = theme.isDarkTheme
    ? 'bg-jackal-green/25'
    : 'bg-jackal-green/10'
  const walletText = wallet.initialized
    ? wallet.name || getShortAddress(wallet.address)
    : 'Connect Wallet'

  const changeThemeOnClick = () => {
    theme.setIsDarkTheme(!theme.isDarkTheme)
  }

  useEffect(() => {
    // Used for listening keplr account changes
    window.addEventListener('keplr_keystorechange', () => {
      keplr.connect(true)
    })
  }, [])

  const connectWallet = useCallback(() => keplr.connect(), [keplr])

  const walletOnClick = () => {
    if (wallet.initialized) {
      keplr.disconnect()
    } else {
      connectWallet()
    }
  }

  return (
    <div className="min-w-[250px] h-full border-r-[1px] border-r-plumbus-light pt-5 pb-8 px-5 flex flex-col bg-black/50">
      <Link href="/" passHref>
        <button className="flex w-13 rounded-full items-center">
          <img
            src="/logo.png"
            alt="logo"
            width={55}
            height={55}
            className="full"
          />
          <span
            className={`${
              theme.isDarkTheme ? 'text-white' : 'text-white'
            } text-2xl ml-2 font-bold font-[Lato]`}
          >
            RNS
          </span>
        </button>
      </Link>

      <button
        onClick={walletOnClick}
        className="w-full h-14 flex items-center rounded-lg p-2 my-5"
      >
        {keplr.initializing ? (
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
          </div>
        ) : (
          <>
            <BiWallet className="mr-2" size={24} /> {walletText}
          </>
        )}
      </button>

      <div className="my-4">
        <Link href="/" passHref>
          <button
            className={`flex items-center mb-1 w-full rounded-lg p-2 ${
              !(
                router.pathname.includes('/register') ||
                router.pathname.includes('/manage') ||
                router.pathname.includes('/resolve') ||
                router.pathname.includes('/admin')
              )
                ? activeColor
                : ''
            }`}
          >
            <div className="font-mono">Home</div>
          </button>
        </Link>

        <Link href="/register" passHref>
          <button
            className={`flex items-center mb-1 w-full rounded-lg p-2 ${
              router.pathname.includes('/register') ? activeColor : ''
            }`}
          >
            <div className="font-mono">Register</div>
          </button>
        </Link>

        <Link href="/manage" passHref>
          <button
            className={`flex items-center mb-1 w-full rounded-lg p-2 ${
              router.pathname.includes('/manage') ? activeColor : ''
            }`}
          >
            <div className="font-mono">Manage</div>
          </button>
        </Link>
        <Link href="/resolve" passHref>
          <button
            className={`flex items-center mb-1 w-full rounded-lg p-2 ${
              router.pathname.includes('/resolve') ? activeColor : ''
            }`}
          >
            <div className="font-mono">Resolve</div>
          </button>
        </Link>
      </div>

      <div className="flex-1"></div>

      <div className="mb-3 font-mono">RNS v0.1.0-beta</div>
      <div className="ml-3">
        <a
          href="https://jackal-wiki.notion.site/JACKAL-Wiki-02cf967e0a10475983823645238b8852"
          target="_blank"
          rel="noreferrer"
        >
          <button className="flex items-center my-3">
            <ImArrowUpRight2 className="mr-2" /> Documentation
          </button>
        </a>
        <a href="https://www.junonetwork.io/" target="_blank" rel="noreferrer">
          <button className="flex items-center my-3">
            <ImArrowUpRight2 className="mr-2" /> Powered by Juno
          </button>
        </a>
        <a href="https://jackaldao.com" target="_blank" rel="noreferrer">
          <button className="flex items-center">
            <ImArrowUpRight2 className="mr-2" /> Made by JACKAL Labs
          </button>
        </a>
      </div>
      <div className="mt-5 flex items-center justify-evenly">
        <a
          href="https://discord.com/invite/5GKym3p6rj"
          target="_blank"
          rel="noreferrer"
        >
          <button className="flex items-center">
            <SiDiscord size={20} />
          </button>
        </a>
        <a
          href="https://t.me/+efpi_EpqiBA1Yzdh"
          target="_blank"
          rel="noreferrer"
          className="ml-5"
        >
          <button className="flex items-center">
            <SiTelegram size={20} />
          </button>
        </a>
        <a
          href="https://twitter.com/JACKAL_DAO"
          target="_blank"
          rel="noreferrer"
          className="ml-5"
        >
          <button className="flex items-center">
            <ImTwitter size={20} />
          </button>
        </a>
        <a
          href="https://github.com/JACKAL-DAO"
          target="_blank"
          rel="noreferrer"
          className="ml-5"
        >
          <button className="flex items-center">
            <ImGithub size={20} />
          </button>
        </a>
      </div>
    </div>
  )
}

export default Sidebar
