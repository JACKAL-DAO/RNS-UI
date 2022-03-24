import { Bech32, fromHex, toHex } from '@cosmjs/encoding'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

export function resolveName(
  name: string,
  prefix: string = '',
  contractAddress: string = 'juno1ysj68e0fd8skp7xy23rm4jstwm0jpwmyckpj5zge9a03rxy4ay2s7ltm7f',
  rpc: string = 'https://rpc-juno.itastakers.com/'
): Promise<string> {
  return new Promise((resolve, reject) => {
    CosmWasmClient.connect(rpc).then((client) => {
      if (name.endsWith('.rns')) {
        name = name.substring(0, name.length - 4)
      }

      let chunks = name.split('.')

      if (prefix.length < 1) {
        prefix = chunks[0]

        if (chunks.length <= 1) {
          reject(
            new Error(
              'If not using the {prefix}.{name} model then you must supply a prefix to the function call.'
            )
          )
        }
      }

      const msg = { resolve_attributes: { name: name } }

      client
        .queryContractSmart(contractAddress, msg)
        .then((response) => {
          switch (prefix) {
            case 'secret':
              resolve(response.name.secret_address)
              break
            case 'cro':
              resolve(response.name.crypto_org_address)
              break
            case 'star':
              resolve(response.name.starname_address)
              break
            case 'persistence':
              resolve(response.name.persistence_address)
              break
            case 'kava':
              resolve(response.name.kava_address)
              break
            default:
              resolve(getAddress(prefix, getHex(response.name.owner)))
              break
          }
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  })
}

export function getAddress(prefix: string, hex: string): string {
  return Bech32.encode(prefix, fromHex(hex))
}

export function getHex(address: string): string {
  return toHex(Bech32.decode(address).data)
}

export default { getAddress, getHex, resolveName }
