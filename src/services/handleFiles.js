import JSZip from 'jszip'
import CryptoJS from 'crypto-js'
import {
  b64toBlob,
  base64ArrayBuffer,
  asyncForEach,
  fileToArrayBuffer
} from './helpers'

export const getSHA256 = async(value) => {
  return await CryptoJS.SHA256(value).toString()
}

export const checkDataloft  = async(file) => {
  try {
    let zip = await JSZip.loadAsync(file)
    if ('.meta' in zip.files)
      var content = JSON.parse(await zip.file('.meta').async('string'))
      if ('dataloft' in content) {
        if (content['dataloft' === true]) {
          return true
        }
      }

  } catch (error){
    console.log(error)
  }
  return false
} 

function incrementProgress() {
  postMessage('incrementProgress')
}

export const handleFiles = async(fileList) => {
  let numData = 0
  await asyncForEach(fileList, async file => {
    let d = await checkDataloft(file)
    if (d) {
      numData += 1
    }
  })

  if (numData === 1 && fileList.length === 1) {
    return 'decrypt'
  } else {
    if (fileList.length === 1) {
      return 'encrypt'
    } else if (fileList.length > 1) {
      return 'encrypt-multiple'
    }
  }
}

export const combineToZip = async(fileList) => {
  let zip = new JSZip()
  await asyncForEach(fileList, async(file) => {
    zip.file(file.name, file)
  })

  return zip.generateAsync ({
    type: 'base64'
  })
}

export const getKey = async (key) => {
  return await getSHA256("dataloft-" + key + "-dataloft")
}

export const fileToData = async (file) => {
  let data = await fileToArrayBuffer(file)
  return base64ArrayBuffer(data)
}

export const encrypt = async (data, filename, key, hint) => {
  let eKey = await getKey(key)
  incrementProgress()

  let encrypted = await CryptoJS.AES.encrypt(data, eKey).toString()
  incrementProgress()
  let md5 = CryptoJS.MD5(data).toString()
  incrementProgress()
  let sha256HashEncrypted = await CryptoJS.AES.encrypt(await getSHA256(encrypted), eKey).toString()
  let sha256HashUnencrypted = await CryptoJS.AES.encrypt(await getSHA256(data), eKey).toString()
  incrementProgress()
  const name = await CryptoJS.AES.encrypt(filename, eKey).toString()
  incrementProgress()
  let metadata = {
    hint: hint != null ? hint : "",
    filename: name,
    dataloft: true,
    sha256Before: sha256HashUnencrypted,
    sha256After: sha256HashEncrypted
  };

  incrementProgress()

  let zip = new JSZip()
  zip.file(".meta", JSON.stringify(metadata))

  zip.file("file", encrypted, {
    base64: true
  })

  let newZip = await zip.generateAsync({
    type: "blob"
  })

  incrementProgress()

  return {
    file: newZip,
    name: md5 + ".dataloft"
  }
}

export const decrypt = async (file, key) => {
  let eKey = await getKey(key)
  incrementProgress()
  let zip = await JSZip.loadAsync(file)
  let metadata = JSON.parse(await zip.file(".meta").async("string"))
  let content = await zip.file("file").async("base64")
  incrementProgress()
  try {
    var decrypted = await CryptoJS.AES.decrypt(content, eKey).toString(CryptoJS.enc.Utf8);
  } catch {
    return {
      file: null,
      error: "key-incorrect-or-corrupted",
      name: null
    }
  }
  incrementProgress()
  let sha256HashEncrypted = await getSHA256(content)
  let sha256HashUnencrypted = await getSHA256(decrypted)
  incrementProgress()
  if (await CryptoJS.AES.decrypt(metadata.sha256Before, eKey).toString(CryptoJS.enc.Utf8) === sha256HashUnencrypted && await CryptoJS.AES.decrypt(metadata.sha256After, eKey).toString(CryptoJS.enc.Utf8) === sha256HashEncrypted) {
    incrementProgress()
    let name = await CryptoJS.AES.decrypt(metadata.filename, eKey).toString(CryptoJS.enc.Utf8)
    incrementProgress()
    let blob = b64toBlob(decrypted)
    let blobUrl = URL.createObjectURL(blob)
    incrementProgress()
    return {
      file: blobUrl,
      error: null,
      name
    }
  }
  return {
    file: null,
    error: "no-integrity",
    name: null
  }
}

export const getHint = async (file) => {
  let zip = await JSZip.loadAsync(file);
  let metadata = JSON.parse(await zip.file(".meta").async("string"));
  return metadata.hint ? metadata.hint : null;
}