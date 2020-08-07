import { JobStatus } from "@textile/grpc-powergate-client/dist/ffs/rpc/rpc_pb"
import { createPow } from "@textile/powergate-client"
const host = "http://x.x.x.x:6002" // or whatever powergate instance you want
const pow = createPow({ host })
const { status, messagesList } = await pow.health.check()

const { peersList } = await pow.net.peers()
const { token } = await pow.ffs.create()
await pow.setToken(token)

// get wallet addresses associated with your FFS instance
const {addrsList} = await pow.ffs.addrs()

// create a new address associated with your ffs instance
const {addr} = await pow.ffs.newAddr("my new addr")

// get general info about your ffs instance
const {info} = await pow.ffs.info()

// cache data in IPFS in preparation to store it using FFS
const {cid} = await pow.ffs.stage(buffer)

// store the data in FFS using the default storage configuration
const cidConfig = [{
  "Hot": {
    "Enabled": false,
    "AllowUnfreeze": false,
    "Ipfs": {
      "AddTimeout": 30
    }
  },
  "Cold": {
    "Enabled": true,
    "Filecoin": {
      "RepFactor": 1,
      "DealMinDuration": 1000,
      "ExcludedMiners": null,
      "TrustedMiners": null,
      "CountryCodes": null,
      "Renew": {
        "Enabled": false,
        "Threshold": 0
      },
      "Addr": addr,
      "MaxPrice": 0
    }
  },
  "Repairable": false
}]


await pow.ffs.setDefaultStorageConfig(cidConfig)

const {jobId} = await pow.ffs.pushStorageConfig("Qme1Uj2ZP9duKSurtGhJDPfA9KFaovAyAnj8QxQsCW7xMf")
// watch the FFS job status to see the storage process progressing
const jobsCancel = await pow.ffs.watchJobs((job) => {
  if (job.status === JobStatus.JOB_STATUS_CANCELED) {
  } else if (job.status === JobStatus.JOB_STATUS_FAILED) {
  } else if (job.status === JobStatus.JOB_STATUS_SUCCESS) {
  }
}, jobId)

// watch all FFS events for a cid
const logsCancel = pow.ffs.watchLogs((logEvent) => {
  console.log(`received event for cid ${logEvent.cid}`)
}, cid)

// get the current desired storage configuration for a cid (this configuration may not be realized yet)
const {config} = await pow.ffs.getStorageConfig(cid)

// get the current actual storage configuration for a cid
const {cidInfo} = await pow.ffs.show(cid)

// retrieve data from FFS by cid
const bytes = await pow.ffs.get(cid)

// send FIL from an address managed by your FFS instance to any other address
const tx = await pow.ffs.sendFil(addrs, "<some other address>", 1000)
