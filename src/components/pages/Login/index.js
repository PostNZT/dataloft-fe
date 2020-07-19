import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hasCompatibleMetamask } from 'services/helpers'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { FaChrome, FaFirefoxBrowser } from 'react-icons/fa'

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
  

  const handleClickLogin = async () => {
    const account = await window.ethereum.enable()
    const address = account[0]

    createFFSRequest(address)
  }

  const isCompatible = hasCompatibleMetamask() ? true: false

  useEffect(() => {
    setHasInstalledMetamask(isCompatible)
    //eslint-disable-next-line
  }, [])

  return (
    <div className={classes.page}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
         <BrandIcon />
          {
            hasInstalledMetamask && (
                <Button 
                variant="contained" 
                color="primary"
                type="submit"
                onClick={handleClickLogin}
                >
                Login with Metamask
                </Button>
            )
          }
          {
            !hasInstalledMetamask && (
              <React.Fragment>
                <Typography variant="subtitle1" className={classes.white}>Install Metamask</Typography><br />
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" fullWidth>
                  <Button 
                    startIcon={<FaChrome />}  
                    href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" 
                    rel="noopener noreferrer"
                    target="_blank">
                      Chrome
                    </Button>
                  <Button 
                    startIcon={<FaFirefoxBrowser />} 
                    href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" 
                    rel="noopener noreferrer"
                    target="_blank">
                    Firefox
                  </Button>
                </ButtonGroup>
              </React.Fragment>
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