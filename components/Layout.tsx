import { ReactNode } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen relative overflow-hidden juno-gradient-bg text-white">
      <Head>
        <title>RNS - IBC Name Service</title>
        <meta name="description" content="Domain Name Service serving the IBC." />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className="h-full flex z-10">
        <Sidebar />
        <main className="flex-grow flex flex-col items-center justify-center">
          {children}
          {/*  */}
        </main>
      </div>
    </div>
  )
}

export default Layout
