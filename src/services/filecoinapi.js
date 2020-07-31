import { newFromString, encode, newAddress, validateAddressString } from "@openworklabs/filecoin-address";
import sigUtil from "eth-sig-util";
import ethUtil from "ethereumjs-util"
import filecoin_signer from "@zondax/filecoin-signing-tools/js"
import Filecoin, { LocalNodeProvider, } from '@openworklabs/filecoin-wallet-provider'
const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
const bip32 = require('bip32');
const { ecdsaSign, ecdsaRecover, publicKeyConvert } = require('ethereum-cryptography/secp256k1')

const config = {
  apiAddress: 'http://127.0.0.1:7777/rpc/v0',
  token: "cfca00c9-5157-4b0b-b743-1ae252f2b6d2", // required
}


const EXAMPLE_TRANSACTION = {
  "to": "t17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy",
  "from": "t1d2xrzcslx7xlbbylc5c3d5lvandqw4iwl6epxba",
  "nonce": 1,
  "value": "100000",
  "gasprice": "2500",
  "gaslimit": 25000,
  "method": 0,
  "params": ""
};

const MASTER_KEY = "xprv9s21ZrQH143K49QgrAgAVELf6ue2tZNHYUc7yfj8JGZY9SpZ38u8EfhWi85GsA6grUeB36wXrbNTkjX9EfGP1ybbPRG4sdP2EPfY1SZ2BF5";
let MASTER_NODE = bip32.fromBase58(MASTER_KEY);

// returns a 32 bit private key
export function genKeys() {

  var seed = filecoin_signer.generateMnemonic()
  console.log("m/44'/1'/0/0/0".split("/")[2].slice(0, -1))
  console.log(seed)
  const privKey = filecoin_signer.keyDerive(seed, "m/44'/1'/0/0/0", "")
  console.log(privKey)

  return(privKey)
}

export function pubKeytoAddress(publicKey) {
  //slice public key
  var sender = ethUtil.publicToAddress(Buffer.from(publicKeyConvert(publicKey, false).slice(1)));

  //new address from pubKey
  const newaddress = newAddress(1, sender)

  //testnet prefix
  const networkPrefix = 't'

  //encode to readable address
  const encoded = encode(networkPrefix, newaddress)

  console.log(Buffer.from(publicKeyConvert(publicKey, false).slice(1)))
  console.log(sender)
  console.log(newaddress.payload())
  console.log("encoded " + encoded)
  console.log(validateAddressString(encoded))

  return encoded

}

export function recordAccountOnFilecoin(address, privKey) {
  console.log(privKey.address)
  const Message = {
    "to": "t16yuzgsz5dy5kiwauwzcznxnc2hc6aa2adr6u77a",
    "from": address,
    "nonce": 1,
    "value": "100000",
    "gasprice": "2500",
    "gaslimit": 25000,
    "method": 0,
    "params": ""
  };

  var sig = filecoin_signer.transactionSign(Message, privKey.toString("hex"))
  console.log(sig);

  return sig
}

export async function transactionSignRawTest() {
  const example_key = MASTER_NODE.derivePath("m/44'/461'/0/0/0");
  var signed_tx = await filecoin_signer.transactionSign(EXAMPLE_TRANSACTION, example_key.privateKey.toString("hex"))
  console.log(signed_tx);
}


export async function sendSignedMessage(message, sig) {
  const filecoin = new Filecoin(new LocalNodeProvider(config), config)
  // note, see section below on signedMessages
  const tx = await filecoin.sendMessage(message, sig)
  return tx
}


