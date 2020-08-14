import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose'
import { getSavedUserRequest } from 'store/auth/actions'
import { 
  getBucketIdentityRequest,
  getBucketDataFilesRequest
} from 'store/bucket/actions'

const Init = (props) => {
  const { 
    children, 
    getSavedUserRequest, 
    getBucketIdentityRequest, 
    getBucketDataFilesRequest 
  } = props
  const [init, setInit] = useState(false)

  useEffect(() => {
    getSavedUserRequest()
    .then(() => {
      getBucketIdentityRequest()
      .then((identity) => {
        getBucketDataFilesRequest(identity)
        setInit(true)
      })
    })   
  }, [])

  return (
    <React.Fragment>
      { init && (children) }
    </React.Fragment>
  )
}
 
const mapDispatchToProps = dispatch => ({ 
  ...bindActionCreators({
    getSavedUserRequest,
    getBucketIdentityRequest,
    getBucketDataFilesRequest,
  }, dispatch)
})

export default compose(
  connect(null, mapDispatchToProps)
)(Init)