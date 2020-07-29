export const GET_DATA_FILES_REQUEST = 'GET_DATA_FILES_REQUEST'

export const getDataFilesRequest = (fileList, mode, hint) => ({
  type: GET_DATA_FILES_REQUEST,
  payload: {
    fileList,
    mode,
    hint
  }
})