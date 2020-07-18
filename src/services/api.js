import axios from 'axios'
import config from 'config'

const targetAPI = config.TARGET_API

export const createFFS = (type, address) => {
  const body = {
    address
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: targetAPI,
      data: body,
    }).then(({data}) => {
      resolve({ response: data })
    }).catch((error) => {
      reject({ error })
    })
  })
}