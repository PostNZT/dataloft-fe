const axios = require('axios');
export const pinByHash = (hashToPin, fileName) => {
  const url = `https://api.pinata.cloud/pinning/pinByHash`;
  const body = {
    hashToPin: hashToPin,
    host_nodes: [
      '/ip4/hostNode1ExternalIP/tcp/4001/ipfs/hostNode1PeerId',
      '/ip4/hostNode2ExternalIP/tcp/4001/ipfs/hostNode2PeerId'
    ],
    pinataMetadata: {
      name: fileName,
      keyvalues: {
        customKey: '',
        customKey2: ''
      }
    }
  };
  return axios
    .post(
      url,
      body,
      {
        headers: {
          'pinata_api_key': '352ac4fe490e6e9fd83b',
          'pinata_secret_api_key': '17b7ee05c98150c2ad46fd28c782c9dfbc693b73fc9e952d672e8b4e7083e585'
        }
      }
    ).then(function (response) {
      //handle response here
      return response
    })
    .catch(function (error) {
      //handle error here
      return error
    });
};
