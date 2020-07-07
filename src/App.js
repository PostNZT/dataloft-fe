import React from 'react'
import routes from 'routes'
import {
  Switch,
  Route,
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withRouter } from 'react-router'
import { Init } from 'components'

const RouteWithSubRoutes = (route) => {
  return (
    <Route 
      path={route.path}
      render={props => (
        <route.component { ...props} routes={route.routes} />
      )}
    />
  )
}

const App = (props) => {
  // const { location } = props
  // const { pathname } = location

  return (
    <React.Fragment>
      <CssBaseline />
      <Init>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Init>
    </React.Fragment>
  )
}

export default App