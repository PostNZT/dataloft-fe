import axios from 'axios'
import config from 'config'

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