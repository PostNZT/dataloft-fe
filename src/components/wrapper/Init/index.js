import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose'
import { getSavedUserRequest } from 'store/auth/actions'
import { getBucketIdentityRequest } from 'store/files/actions'

const Init = (props) => {
  const { children, getSavedUserRequest, getBucketIdentityRequest } = props
  const [init, setInit] = useState(false)

  useEffect(() => {
    getSavedUserRequest()
    .then(() => {
      setInit(true)
      getBucketIdentityRequest()
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
  }, dispatch)
})

export default compose(
  connect(null, mapDispatchToProps)
)(Init)