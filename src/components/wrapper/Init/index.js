import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose'
import { getSavedUserRequest } from 'store/auth/actions'

const Init = (props) => {
  const { children, getSavedUserRequest } = props
  const [init, setInit] = useState(false)

  useEffect(() => {
    getSavedUserRequest()
      .then(() => {
        setInit(true)
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
  }, dispatch)
})

export default compose(
  connect(null, mapDispatchToProps)
)(Init)