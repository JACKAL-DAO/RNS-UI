import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WalletProvider } from 'contexts/wallet'
import { ContractsProvider } from 'contexts/contracts'
import { ThemeProvider } from 'contexts/theme'
import Layout from 'components/Layout'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light')
  const [network, setNetwork] = useState('testnet')

  return (
    <ThemeProvider theme={theme} setTheme={setTheme}>
      <WalletProvider network={network} setNetwork={setNetwork}>
        <ContractsProvider>
          <Layout>
            <div>
              <Toaster position="top-center" />
            </div>
            <Component {...pageProps} />
          </Layout>
        </ContractsProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default MyApp
