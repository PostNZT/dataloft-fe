import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hasCompatibleMetamask } from 'services/helpers'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { FaChrome, FaFirefoxBrowser } from 'react-icons/fa'
import InputBase from '@material-ui/core/InputBase'
import classNames from 'classnames'

import { 
  createFFSRequest, 
  createWalletJWTTokenRequest,
  createDataloftAccountRequest 
} from 'store/create/actions'

import {
  createMetamaskAccountRequest
} from 'store/auth/actions'

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
    paddingTop: 150,
  },
  page: {
    height: '100vh',
    width: '100%',
    backgroundImage: `url("./img/background/login-bg.jpg")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  white: {
    color: 'white',
  },
  gray: {
    color: '#898c90',
  },
  graySubtitleWrapper: {
    paddingLeft: 60,
  },
  brandWrapper: {
    paddingLeft: 90,
  },
  login: {
    position: 'relative',
    borderRadius: 5,
    backgroundColor: '#36393f',
    marginLeft: 0,
    paddingLeft: 10,
    width: '100%',
  },
  inputRoot: {
    color: '#303339',
    width: '100%',
    paddingRight: 10,
    height: 50,
  },
  inputInput: {
    border: '1px solid #232529',
    paddingLeft: 10,
    width: '100%',
  },
  buttonWrapper: {
    paddingLeft: 90,
    paddingBottom: 15
  },
})

const Login = (props) => {
  const {
    classes,
    createDataloftAccountRequest,
    createMetamaskAccountRequest,
  } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasInstalledMetamask, setHasInstalledMetamask] = useState(true)

  const handleClickLogin = async () => {
    const account = await window.ethereum.enable()
    const address = account[0]

    const username = 'dataloft'
    const password = 'testingpass'
    createMetamaskAccountRequest(username, password, address)
  }

  const handleClickLoginMetamask = async () => {
    const account = await window.ethereum.enable()
    const address = account[0]

    const username = 'dataloft'
    const password = 'testingpass'
    createMetamaskAccountRequest(username, password, address)
  }

  const onChange = (e) => {
    const { target } = e
    const { value, name } = target

    if (name === 'username') {
      setUsername(value)
    } else {
      setPassword(value)
    }

  }

  const isCompatible = hasCompatibleMetamask() ? true: false

  useEffect(() => {
    setHasInstalledMetamask(isCompatible)
    //eslint-disable-next-line
  }, [])

  return (
    <div className={classes.page}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
         <div className={classes.paper}>
           <div className={classes.brandWrapper}>
              <BrandIcon />
            </div>   
          <div className={classes.login}> 
            <div style={{ paddingTop: 15, paddingBottom: 15 }} >
              <Typography
                align='center'
                variant='h6'
                className={classes.white}
              >
                Welcome back!
              </Typography>
              <Typography
                align='justify'
                variant='subtitle2'
                className={classNames(classes.gray, classes.graySubtitleWrapper)}
              >
                We're so excited to see you on the loft again!
              </Typography>
            </div>
            <div style={{ paddingBottom: 15 }}>
              <InputBase
                placeholder="Username"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 
                  'aria-label': 'login', 
                  className: classes.white 
                }}
                name="username"
                value={username}
                onChange={onChange}
              />
              <InputBase
                placeholder="Password"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 
                  'aria-label': 'login', 
                  className: classes.white,
                  type: 'password',
                  autoComplete: 'new-password', 
                }}
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            {
              hasInstalledMetamask && (
                <React.Fragment>
                  <div className={classes.buttonWrapper}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      type="submit"
                      onClick={handleClickLogin}
                    >
                      Login 
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      type="submit"
                      onClick={handleClickLoginMetamask}
                    >
                      Login with Metamask
                    </Button>
                  </div>
                </React.Fragment>
              )
            }
            {
              !hasInstalledMetamask && (
                <React.Fragment>
                  <Typography variant="subtitle1" className={classes.white}>Please Install Metamask</Typography><br />
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
            </div>
         </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.create.get('user'),
  jwt_token: state.create.get('jwt_token'),
  dataloft_account: state.create.get('dataloft_account')
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    createFFSRequest,
    createWalletJWTTokenRequest,
    createDataloftAccountRequest,
    createMetamaskAccountRequest,
  }, dispatch)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)