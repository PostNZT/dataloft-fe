import {
  AppFrame,
  Home,
  Login,
  Register,
} from 'components'

const routes =  [
  {
    component: AppFrame,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/register',
        exact: true,
        component: Register,
      },
    ]
  },
]
export default routes
