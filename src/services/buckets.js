import { Libp2pCryptoIdentity } from "@textile/threads-core"
import { Buckets } from '@textile/hub'
const keyInfo = {key: 'bf5bmop3o7kzbwpt6s5w3jrhkau'}

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


export async function setup(identity) {
  console.log(identity)
  // Use the insecure key to setup a new session
  const buckets = await Buckets.withKeyInfo(keyInfo)
  console.log(buckets)
  // Authorize the user and your insecure keys with getToken
  await buckets.getToken(identity)

  const root = await buckets.open('dataloft')
  console.log(root)
  if (!root) {
    throw new Error('Failed to open bucket')
  }
  // returns list of files in a bucket
  const list = await buckets.listIpfsPath(root.path)
  return {
    list: list,
    buckets: buckets,
    bucketKey: root.key,
  }
}

export async function insertFileBucket(buckets, bucketKey, file, path) {
  // Finally, push the full file to the bucket
  console.log({bucketKey})
  const raw = await buckets.pushPath(bucketKey, path, file.file)
  console.log(raw)
  return raw
}
