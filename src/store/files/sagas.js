import { call, put, takeEvery } from 'redux-saga/effects'



import {
  GET_DATA_FILES_REQUEST
} from './actions'



function* getDataFilesRequest(payload, meta) {
  const { fileList } = payload
    
  // const mode = yield call(handleFiles, fileList)
  
  // if (mode === 'encrypt') {
  //   const data = yield call (fileToData, fileList[0])
    
  //   console.data(data)

  //   //connect to encrypt sagas
  // } else if ('decrypt') {
  //   //connect to decrypt sagas
  //   console.log('decrypt')
  // } else if ('encrypt-multiple') {
  //   //connect to encrypt-multiple
  //   console.log('encrypt-multiple')
  // }

  // if (mode === 'decrypt') {
  //   const hint = getHint(fileList[0])
  //   if (hint) {
  //     //
  //   }
  // } else {
  //   //
  // }


}

function* watchGetDataFilesRequest({payload, meta}) {
  yield call(getDataFilesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_DATA_FILES_REQUEST, watchGetDataFilesRequest) 
}




// else if (props.files.mode === "encrypt") {
//         worker.fileToData(props.files.fileList[0]).then((data) => {
//             props.nextStep();
//             worker.encrypt(data, props.files.fileList[0].name, props.files.password, props.files.hint).then((obj) => {
//                 Modal.success({
//                     title: "Success",
//                     content: "The file was encrypted successfully, you will be able to save the Dataloft now",
//                     onOk: () => props.reset()
//                 });
//                 FileSaver.saveAs(obj.file, obj.name);
//             });
//         });