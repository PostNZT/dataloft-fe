export const GET_BUCKET_IDENTITY_REQUEST = 'GET_BUCKET_IDENTITY_REQUEST'
export const GET_BUCKET_IDENTITY_SUCCESS = 'GET_BUCKET_IDENTITY_SUCCESS'

export const getBucketIdentityRequest = () => ({
	type: GET_BUCKET_IDENTITY_REQUEST,
	meta : {
		thunk: true
	}
})

export const getBucketIdentitySuccess = (response, meta) => ({
	type: GET_BUCKET_IDENTITY_SUCCESS,
	payload: response,
	meta
})

export const GET_BUCKET_DATA_FILES_REQUEST = 'GET_BUCKET_DATA_FILES_REQUEST'
export const GET_BUCKET_DATA_FILES_SUCCESS = 'GET_BUCKET_DATA_FILES_SUCCESS'
export const GET_BUCKET_DATA_FILES_FAILURE = 'GET_BUCKET_DATA_FILES_FAILURE'

export const getBucketDataFilesRequest = (bucketIdentity = null) => ({
  type: GET_BUCKET_DATA_FILES_REQUEST,
  payload: {
    bucketIdentity
  },
  meta: {
    thunk: true
  }
})

export const getBucketDataFilesSuccess = (response, meta) => ({
  type: GET_BUCKET_DATA_FILES_SUCCESS,
  payload: response,
  meta
})

export const getBucketDataFilesFailure = (error, meta) => ({
  type: GET_BUCKET_DATA_FILES_FAILURE,
  payload: error,
  meta
})