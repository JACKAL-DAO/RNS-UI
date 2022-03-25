import { AppConfig, NetConfig } from './app'

export const mainnetConfig: AppConfig = {
  chainId: 'juno-1',
  chainName: 'Juno',
  addressPrefix: 'juno',
  rpcUrl: 'https://rpc.juno-1.deuslabs.fi',
  // httpUrl: "https://rpc.juno-1.deuslabs.fi",
  feeToken: 'ujuno',
  stakingToken: 'ujuno',
  coinMap: {
    ujuno: { denom: 'JUNO', fractionalDigits: 6 },
  },
  gasPrice: 0.025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const uniTestnetConfig: AppConfig = {
  chainId: 'uni-2',
  chainName: 'Uni',
  addressPrefix: 'juno',
  rpcUrl: 'https://rpc.uni.juno.deuslabs.fi',
  httpUrl: 'https://lcd.uni.juno.deuslabs.fi',
  faucetUrl: 'https://faucet.uni.juno.deuslabs.fi',
  feeToken: 'ujunox',
  stakingToken: 'ujunox',
  coinMap: {
    ujunox: { denom: 'JUNOX', fractionalDigits: 6 },
  },
  gasPrice: 0.025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const secretConfig: AppConfig = {
  chainId: 'secret-4',
  chainName: 'Secret',
  addressPrefix: 'secret',
  rpcUrl: 'http://api.scrt.network:26657/',
  // httpUrl: "https://rpc.juno-1.deuslabs.fi",
  feeToken: 'uscrt',
  stakingToken: 'uscrt',
  coinMap: {
    ujuno: { denom: 'SCRT', fractionalDigits: 6 },
  },
  gasPrice: 0.025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const cosmosConfig: AppConfig = {
  chainId: 'cosmos-4',
  chainName: 'Cosmos Hub',
  addressPrefix: 'cosmos',
  rpcUrl: 'https://rpc.cosmos.network/',
  // httpUrl: "https://rpc.juno-1.deuslabs.fi",
  feeToken: 'uatom',
  stakingToken: 'uatom',
  coinMap: {
    ujuno: { denom: 'ATOM', fractionalDigits: 6 },
  },
  gasPrice: 0.025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const osmoConfig: AppConfig = {
  chainId: 'osmosis-1',
  chainName: 'Osmosis',
  addressPrefix: 'osmo',
  rpcUrl: 'https://osmosis.validator.network/',
  // httpUrl: "https://rpc.juno-1.deuslabs.fi",
  feeToken: 'uosmo',
  stakingToken: 'uosmo',
  coinMap: {
    ujuno: { denom: 'OSMO', fractionalDigits: 6 },
  },
  gasPrice: 0,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const getConfig = (network: string): AppConfig => {
  const nets: NetConfig = {
    mainnet: mainnetConfig,
    juno: mainnetConfig,
    testnet: uniTestnetConfig,
    secret: secretConfig,
    cosmos: cosmosConfig,
    osmo: osmoConfig,
  }

  let choice = nets[network as keyof NetConfig]
  if (choice == undefined) {
    choice = mainnetConfig
  }
  return choice
}
