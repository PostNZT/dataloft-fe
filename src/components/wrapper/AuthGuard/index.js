import React from 'react'
import { connect } from 'react-redux'
import { useLocation, Redirect } from 'react-router-dom'

const AuthGuard = (props) => {
  const { children, dataloft_user } = props
  const location = useLocation()
  const { pathname } = location
  // const { is_authenticated } = dataloft_user

  const is_authenticated = true
  const isUnguardedRoute = () => {
    return (pathname === '/login' || pathname.includes('/register'))
  }

  return (
    <React.Fragment>
      {
        isUnguardedRoute() && is_authenticated && (
          <Redirect to={{ pathname: '/', }} />
        )
      }
      {
        !isUnguardedRoute() && !is_authenticated && (
          <Redirect to={{ pathname: '/login', }} />
        )
      }
      { children }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  dataloft_user: state.auth.get('dataloft_user'),
})

export default connect(mapStateToProps)(AuthGuard)
