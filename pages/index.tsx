import type { NextPage } from 'next'
import Link from 'next/link'
import { useTheme } from 'contexts/theme'

const Home: NextPage = () => {
  const theme = useTheme()

  return (
    <div className="h-3/4 w-11/12 w-lg-3/4">
      <div className="flex justify-center flex-col items-center">
        <img alt="RNS Logo" src={'/RNS_LOGO.png'} width={650} height={160} />
        <br />

        <div className="text-[4rem]">Retriever Name Service</div>

        <div className="text-center text-xl mt-3">
          RNS is the Inter-Blockchain-Communication name service built on JUNO,
          serving the entire Cosmos Ecosystem.
          <div className="mt-3"></div>
        </div>

        <div className="text-center text-xl mt-14">
          Simplify your COSMOS experience.
        </div>

        <Link href="/register" passHref>
          <button
            className={`${theme.isDarkTheme ? 'bg-gray/10' : 'bg-dark-gray/10'}
            p-3 rounded-lg mt-5 px-10 text-2xl`}
          >
            Register Now
          </button>
        </Link>

        <div className="text-center text-lg mt-32">
          If you recieve an RNS name either by transfer or through a second-hand
          marketplace, you must re-claim it in order for it to resolve some
          networks such as Secret and Crypto.org. Read all about RNS and how it
          works{' '}
          <a
            className="text-emerald-400	"
            href="https://jackal-wiki.notion.site/RNS-Name-Service-b740514f19a547cb8071f0aed0d86a04"
          >
            here
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default Home
