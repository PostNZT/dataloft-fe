import PouchDB from "pouchdb"
let database = new PouchDB('create_database')

export const createWalletAccount = (user) => {
  
}








export const getWalletAccount = (address) => {
  return new Promise((resolve, reject) => {
    database.get(address, function (err, doc) {
      if(err) {
        console.log(err)
        resolve(err)
      } else {
        console.log(doc)
        resolve(doc)
      }
    })
  })
}