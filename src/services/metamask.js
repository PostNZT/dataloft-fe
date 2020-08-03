import {encrypt} from 'eth-sig-util'
import web3 from 'web3'
export function metamaskPublic(accounts) {
  window.ethereum.sendAsync(
    {
      jsonrpc: '2.0',
      method: 'eth_getEncryptionPublicKey',
      params: [accounts[0]],
      from: accounts[0],
    },
    function (error, encryptionpublickey) {
      if (!error) {
        return encryptionpublickey.result;
      } else {
        console.log(error);
      }
    }
  )
}

export async function metamaskEncrypt(data, pubKey) {
  const encryptedMessage = web3.toHex(
    JSON.stringify(
      encrypt(
        pubKey,
        { data: data },
        'x25519-xsalsa20-poly1305'
      )
    )
  )
  console.log(encryptedMessage)
}
