import { 
    Home,
    Login,
  } from 'components'

const routes = [
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

]

export default routes