import axios from 'axios'
import config from 'config'
import { getClient } from "../utils/lotus"
import { ipfs } from "../utils/ipfs"

const targetAPI = config.TARGET_API


export const getMetamaskAddress = (address) => {
  const body = {
    address
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/auth/address`,
      data: body
    }).then(({data}) => {
      resolve({ resolve: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const createFFS = (address) => {
  const body = {
    address
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/create/`,
      data: body
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const createWalletJWTToken = (username, password, address, token) => {
  const body = {
    username,
    password,
    address,
    token
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/auth/generate`,
      data: body,
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const createDataloftAccount = (username, hashPass, pubEncrypt, encryptedKeys, filecoinTx) => {
  const body = {
    username,
    hashPass,
    pubEncrypt,
    encryptedKeys,
    filecoinTx
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/auth/create/dataloft`,
      data: body,
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const authenticateUser = (username, hashPass) => {
  const body = {
    username,
    hashPass
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/auth/user/dataloft`,
      data: body,
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const createMetamaskAccount = (username, password, address) => {
  const body = {
    username, 
    password,
    address
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/auth/create/metamask`,
      data: body
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const getChainStats2 = () => {
  return new Promise((resolve, reject) => {
    const client = getClient()
    client.chainHead((result) => {
      resolve(result)
    })
  })
}

export const getSignMessage = async (sig) => {
    const client = getClient()
    const result = await client.mpoolPush(sig)
    console.log(result)
    return(result["/"])
}

export const uploadToFilecoin = (payload) => async (dispatch) => {
  const client = getClient()
  for await (const result of ipfs.add(payload.fileBuffer)) {
    // Creating a Storage Deal with a Miner
    const dataRef = {
      Data: {
        TransferType: "graphsync",
        Root: {
          "/": result.path,
        },
        PieceCid: null,
        PieceSize: 0,
      },
      Wallet: payload.defaultWalletAddress,
      Miner: payload.targetMiner,
      EpochPrice: payload.epochPrice,
      MinBlocksDuration: 300,
    };
    const deal = await client.clientStartDeal(dataRef);

    document.getElementById("uploadToFilecoin").innerText =
      "Upload to Filecoin Network";

    dispatch({
      payload: {
        id: deal["/"],
        cid: result.path,
      },
    });
  }
}

