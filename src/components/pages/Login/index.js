import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Checkbox from '@material-ui/core/Checkbox'
import { hasCompatibleMetamask } from 'services/helpers'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import { createFFSRequest } from 'store/create/actions'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import compose from 'recompose/compose'

import { 
  BrandIcon,
} from 'components/elements'


const styles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 100,
  },
  page: {
    height: '100vh',
    width: '100%',
  },
  white: {
    color: 'white',
  },
})

const Login = (props) => {
  const {
    classes,
    createFFSRequest,
  } = props

  const [hasInstalledMetamask, setHasInstalledMetamask] = useState(true)
  const [useMetamask, setUseMetamask] = useState(false)

  const handleClickLogin = async () => {
    const account = await window.ethereum.enable()
    const address = account[0]

    createFFSRequest(address)
  }

  const handleClickCheckbox = (e) => {
    const { target } = e
    const { name } = target

    if (name === 'metamask') {
      const isCompatible = hasCompatibleMetamask() ? true: false
      setHasInstalledMetamask(isCompatible)
      setUseMetamask(!useMetamask)
    }
  }

  return (
    <div className={classes.page}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
         <BrandIcon />
         <Checkbox
          name="metamask" 
          checked={useMetamask}
          value="remember"
          // className={classes.white} 
          onClick={handleClickCheckbox}
        />
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            onClick={handleClickLogin}
          >
            Login with Metamask
          </Button>
          {
            hasInstalledMetamask && (
              <FormControlLabel
                className={classes.formLabel}
                control={
                  <Checkbox
                    name="metamask" 
                    checked={useMetamask}
                    value="remember"
                    className={classes.white} 
                    onClick={handleClickCheckbox}
                  />
                }
                label={
                  <Typography variant="subtitle2" className={classes.white}>
                    Login with Hive Metamask
                  </Typography>
                }
              />
            )
          }
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.create.get('user')
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    createFFSRequest,
  }, dispatch)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)