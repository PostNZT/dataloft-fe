import axios from 'axios'
import config from 'config'

const targetAPI = config.TARGET_API

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

export const createDataloftAccount = (username, password, address) => {
  const body = {
    username,
    password,
    address
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${targetAPI}/auth/create`,
      data: body,
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}
