import {encrypt} from 'eth-sig-util'
import web3 from 'web3'
export async function metamaskPublic(address) {
  return new Promise((resolve, reject) => {
     window.ethereum.sendAsync(
      {
        jsonrpc: '2.0',
        method: 'eth_getEncryptionPublicKey',
        params: [address],
        from: address,
      },
      function (error, encryptionpublickey) {
        if (!error) {
          resolve(encryptionpublickey.result)
        } else {
          reject(error)
        }
      }
    )
  })
}

export async function metamaskEncrypt(data, pubKey) {
  console.log(data)
  const encryptedMessage = web3.utils.toHex(
    JSON.stringify(
      encrypt(
        pubKey,
        data,
        'x25519-xsalsa20-poly1305'
      )
    )
  )
  return(encryptedMessage)
}

