import config from 'config'
import { createPow } from "@textile/powergate-client"
import { 
  getWalletAccount, 
  createWalletAccount
} from 'utils/database' 


const POW_HOST = config.POW_HOST

export const powergate = createPow({ POW_HOST })

export const networkHealth = async() => {
  const { status, messageList } = await powergate.health.check()
  const { peersList } = await powergate.net.peers()
  
  return { status, messageList, peersList }
}

export const createFFS = async(payload) => {
  const { address } = payload
  let user = await getWalletAccount(address)
  if (!user.token) {
    try{
      const { token } = await powergate.ffs.create()
      powergate.setToken(token)   
      user = await createWalletAccount({
        _id: address,
        address,
        token
      })
      user = await getWalletAccount(user.id)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(user)
  return user
}

