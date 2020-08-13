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

