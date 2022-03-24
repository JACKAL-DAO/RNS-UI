export async function addTerra() {
  let chainInfo = {
    rpc: 'https://rpc-columbus.keplr.app',
    rest: 'https://lcd-columbus.keplr.app',
    chainId: 'columbus-5',
    chainName: 'Terra',
    stakeCurrency: {
      coinDenom: 'LUNA',
      coinMinimalDenom: 'uluna',
      coinDecimals: 6,
      coinGeckoId: 'terra-luna',
      coinImageUrl:
        'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/luna.png',
    },
    bip44: {
      coinType: 330,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'terra',
      bech32PrefixAccPub: 'terrapub',
      bech32PrefixValAddr: 'terravaloper',
      bech32PrefixValPub: 'terravaloperpub',
      bech32PrefixConsAddr: 'terravalcons',
      bech32PrefixConsPub: 'terravalconspub',
    },
    currencies: [
      {
        coinDenom: 'LUNA',
        coinMinimalDenom: 'uluna',
        coinDecimals: 6,
        coinGeckoId: 'terra-luna',
        coinImageUrl:
          'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/luna.png',
      },
      {
        coinDenom: 'UST',
        coinMinimalDenom: 'uusd',
        coinDecimals: 6,
        coinGeckoId: 'terrausd',
        coinImageUrl:
          'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/ust.png',
      },
      {
        coinDenom: 'KRT',
        coinMinimalDenom: 'ukrw',
        coinDecimals: 6,
        coinGeckoId: 'terra-krw',
        coinImageUrl:
          'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/krt.png',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'LUNA',
        coinMinimalDenom: 'uluna',
        coinDecimals: 6,
        coinGeckoId: 'terra-luna',
        coinImageUrl:
          'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/luna.png',
      },
      {
        coinDenom: 'UST',
        coinMinimalDenom: 'uusd',
        coinDecimals: 6,
        coinGeckoId: 'terrausd',
        coinImageUrl:
          'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/ust.png',
      },
    ],
    gasPriceStep: {
      low: 0.015,
      average: 0.015,
      high: 0.015,
    },
    features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
    explorerUrlToTx: 'https://finder.terra.money/columbus-5/tx/{txHash}',
  }

  await window.keplr.experimentalSuggestChain(chainInfo)
}

export default { addTerra }
