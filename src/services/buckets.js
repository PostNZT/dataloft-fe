import { Libp2pCryptoIdentity } from "@textile/threads-core"
import { Buckets } from '@textile/hub'
const keyinfo = {key: 'API KEY'}

// // Generate random identity or use identity provider such as 3Box
// const identity = await Libp2pCryptoIdentity.fromRandom()
//
// // Init Bucket
// const bucket = await setup(keyInfo.key, identity)
//
// // Upload file array or single file
// for await (const file of acceptedFiles) {
//   const file1 = await insertFile(bucket.buckets, bucket.bucketKey, file, file.name)
// }

// returns list of buckets
//await bucket.buckets.list()

// returns list of links for bucket
//await bucket.buckets.links(bucket.bucketKey)

// returns list of files in a bucket
//await bucket.buckets.listIpfsPath("bafybeie5tjiovwh45f2yjnjxo3nogn67ia37b2qxzuatkddeglugmiz2b4")


async function setup(key, identity) {
  // Use the insecure key to setup a new session
  const buckets = await Buckets.withKeyInfo(keyInfo)

  // Authorize the user and your insecure keys with getToken
  await buckets.getToken(identity)

  const root = await buckets.open('io.textile.dataloft')

  if (!root) {
    throw new Error('Failed to open bucket')
  }
  return {
    buckets: buckets,
    bucketKey: root.key,
  }
}

async function insertFile(buckets, bucketKey, file, path) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = () => reject('file reading was aborted')
    reader.onerror = () => reject('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      // Finally, push the full file to the bucket
      buckets.pushPath(bucketKey, path, binaryStr).then((raw) => {
        resolve(raw)
      })
    }
    reader.readAsArrayBuffer(file)
  })
}


const addIndexHTML = async (buckets, bucketKey, html) => {
  // Store the index.html in the root of the bucket
  const buf = Buffer.from(html)
  const path = `index.html`
  await buckets.pushPath(bucketKey, path, buf)
}
