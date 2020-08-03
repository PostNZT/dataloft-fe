import 'typeface-roboto'
import { createMuiTheme } from '@material-ui/core/styles'

const primary = '#202225'
const secondary = '#3A3B3C'

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    tertiary: 'red',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  button: {
    fontFamily: 'Roboto',
  },
  table: {
    fontFamily: 'Roboto',
  },
  select: {
    fontFamily: 'Roboto',
  },
  status: {
    danger: 'orange',
  },
  overrides: {
    MuiInputLabel: { 
      root: { 
        color: "white",
        "&$focused": {
          color: "white"
        }
      }
    },
    MuiInputBase: {
      input: {
        root: {
          color: 'white',
        },
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  } 
})