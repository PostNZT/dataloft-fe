import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'

import compose from 'recompose/compose'
import { connect } from 'react-redux'

const AuthGuard = (props) => {
  const [loaded, setLoaded] = useState(false)
  const [authenticated , setAuthenticated] = useState(false)
  const { children, location, user } = props
  const { pathname } = location
  
  useEffect(() => {
    setLoaded(true)
  }, [pathname])

  return (
    <React.Fragment>
      {
        loaded && authenticated && pathname === '/login' && (
          <Redirect to={{ pathname: '/', }} />
        )
      }
      { loaded && pathname !== 'login' && (children) }
    </React.Fragment>
  )
}