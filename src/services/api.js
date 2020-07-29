import axios from 'axios'
import config from 'config'
import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
import { BrowserProvider } from "@filecoin-shipyard/lotus-client-provider-browser";
import { testnet } from "@filecoin-shipyard/lotus-client-schema";

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


export const fcChainHead = () => {
  const body = {
    "jsonrpc":"2.0",
    "method":"Filecoin.ChainHead",
    "params":[],
    "id":3
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `ws://localhost:7777/0/node/rpc/v0`,
      data: body
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}

export const createDataloftAccount = (username, password) => {
  const body = {
    username,
    password
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

export const getClient = (options = { nodeOrMiner: "node", nodeNumber: 0 }) => {
  // API endpoint for local Lotus devnet
  const API = "ws://localhost:7777";

  // Websocket endpoint for local Lotus devnet
  const wsUrl = API + `/${options.nodeNumber}/${options.nodeOrMiner}/rpc/v0`;

  // Creating and returning a Lotus client that can be used anywhere in the app
  const provider = new BrowserProvider(wsUrl);
  return new LotusRPC(provider, {
    schema:
      options.nodeOrMiner === "node" ? testnet.fullNode : testnet.storageMiner,
  });
}

export const getChainStats = () => {
  return new Promise((resolve, reject) => {
    const client = getClient()
    client.chainNotify((result) => {
      resolve(result)
    })
  })
}
