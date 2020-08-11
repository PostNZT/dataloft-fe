import { JobStatus } from "@textile/grpc-powergate-client/dist/ffs/rpc/rpc_pb"
import { createPow, ffsTypes } from "@textile/powergate-client"
import config from 'config'
const host = config.POW_HOST
const pow = createPow({ host })


export const createFFS = async() => {
  const { token } = await pow.ffs.create()
  pow.setToken(token)
  return token
}

export const healthCheck  = async() => {
  const { status, messagesList } = await pow.health.check()
  const { peerList } = await pow.net.peers()

  return { status, messagesList, peerList }
}

export const FFSInfo = async() => {
  const { info } = await pow.ffs.info()
  return info
}

export const addressList = async() => {
  const { addrsList } = await pow.ffs.addrs()
  return addrsList
}

export const CID_CONFIG = async(payload) => {
  const { addr } = payload
  const cidconf = [{
    "Hot": {
      "Enabled": true,
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
  console.log(cidconf)
  return cidconf
}

export const ipfsStoreFile = async(payload) => {
  const { encrypted_data } = payload
  const { cid } = await pow.ffs.stage(encrypted_data)
  console.log({cid})
  const { jobId } = await pow.ffs.pushStorageConfig(cid)
  console.log({jobId})
  // const jobStatus = pow.ffs.watchJobs((job) => {
  //   if(job.status === ffsTypes.JobStatus.CANCELED) {
  //     console.log('Job Cancelled')
  //   } else if (job.status === ffsTypes.JobStatus.FAILED) {
  //     console.log('Job Failed') 
  //   } else if (job.status === ffsTypes.JobStatus.SUCCESS) {
  //     console.log('Job Success')
  //   }
  // }, jobId)

  // const log = pow.ffs.watchLogs((logEvent) => {
  //   console.log(`recieved event for cid ${logEvent.cid}`)
  // }, cid)

  return { jobId, cid }
}

export const jobStatus = async(payload) => {
  const { jobId } = payload

  const fileStatus = pow.ffs.watchJobs((job) => {
    if (job.status === JobStatus.JOB_STATUS_CANCELED) {
      console.log("job canceled")
    } else if (job.status === JobStatus.JOB_STATUS_FAILED) {
      console.log("job failed")
    } else if (job.status === JobStatus.JOB_STATUS_SUCCESS) {
      console.log("job success!")
    }
  }, jobId)

  return fileStatus
}

export const cidStatus = async(payload) => {
  const { cid } = payload

  const logsCancel = pow.ffs.watchLogs((logEvent) => {
    console.log(`received event for cid ${logEvent.cid}`)
  }, cid)

  return logsCancel
}

export const createAddress = async(payload) => {
  const { token } = payload
  const address = await pow.ffs.newAddr(token)

  return address
}

export const retrieveFile = async(payload) => {
  const { cid } = payload
  const file = await pow.ffs.get(cid)
  return file
}


export const setDefaultStorageConfig = async(payload) => {
  const cidConfig = payload
  console.log(pow)
  await pow.ffs.setDefaultStorageConfig(cidConfig)
  return
}


// const {jobId} = await pow.ffs.pushStorageConfig("Qme1Uj2ZP9duKSurtGhJDPfA9KFaovAyAnj8QxQsCW7xMf")
// // watch the FFS job status to see the storage process progressing
// const jobsCancel = await pow.ffs.watchJobs((job) => {
//   if (job.status === JobStatus.JOB_STATUS_CANCELED) {
//   } else if (job.status === JobStatus.JOB_STATUS_FAILED) {
//   } else if (job.status === JobStatus.JOB_STATUS_SUCCESS) {
//   }
// }, jobId)

// // watch all FFS events for a cid
// const logsCancel = pow.ffs.watchLogs((logEvent) => {
//   console.log(`received event for cid ${logEvent.cid}`)
// }, cid)

// // get the current desired storage configuration for a cid (this configuration may not be realized yet)
// const {config} = await pow.ffs.getStorageConfig(cid)

// // get the current actual storage configuration for a cid
// const {cidInfo} = await pow.ffs.show(cid)

// // retrieve data from FFS by cid
// const bytes = await pow.ffs.get(cid)

// // send FIL from an address managed by your FFS instance to any other address
// const tx = await pow.ffs.sendFil(addrs, "<some other address>", 1000)
