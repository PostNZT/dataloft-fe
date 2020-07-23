import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hasCompatibleMetamask } from 'services/helpers'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FaChrome, FaFirefoxBrowser } from 'react-icons/fa'
import InputBase from '@material-ui/core/InputBase'
import classNames from 'classnames'
import MuiLink from '@material-ui/core/Link'
import { Link } from 'react-router-dom'

import {
  createDataloftAccountRequest,
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
  formLabel: {
    width: '100%'
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
  const [useMetamask, setUseMetamask] = useState(false)

  const handleClickLogin = () => {
    const username = 'dataloft'
    const password = 'testingpass'
    createDataloftAccountRequest(username, password)
  }

  const handleClickCheckbox = (e) => {
    const { target } = e
    const { name } = target
    
    if (name === 'metamask') {
      setUseMetamask(!useMetamask)
    }
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

  const preventDefault = (event) => event.preventDefault()
  
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
            <div style={{ paddingRight: 15, paddingLeft:15, paddingBottom: 10 }}>
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
                  <div style={{ paddingBottom: 20, paddingRight: 24, paddingLeft: 15 }}>
                    <FormControlLabel
                      className={classes.formLabel}
                      control={
                        <Checkbox
                          name="metamask" 
                          color="default"
                          checked={useMetamask}
                          value="remember"
                          className={classes.white} 
                          onClick={handleClickCheckbox}
                        />
                      }
                      label={
                        <Typography variant="subtitle2" className={classes.white}>
                          Login with Metamask
                        </Typography>
                      }
                    />
                    {
                      !useMetamask && (
                        <React.Fragment>
                          <Button 
                          variant="contained" 
                          color="primary"
                          type="submit"
                          onClick={handleClickLogin}
                          fullWidth
                        >
                          Login 
                        </Button>
                        </React.Fragment>
                      )
                    }
                    {
                      useMetamask && (
                        <React.Fragment>
                          <Button 
                          variant="contained" 
                          color="primary"
                          type="submit"
                          onClick={handleClickLogin}
                          fullWidth
                        >
                          Login with Metamask
                        </Button>
                        </React.Fragment>
                      )
                    }
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
            <div style={{ paddingBottom: 35, paddingLeft: 15 }}>
              <Typography
                  align='justify'
                variant='subtitle2'
                className={classNames(classes.gray)}
              >
                Need an account? &nbsp; 
                <MuiLink component={Link} to={`/register`} className={classes.white}>
                  Register
                </MuiLink>
              </Typography>
            </div>
            
            </div>
         </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  dataloft_account: state.create.get('dataloft_account'),
  metamask_account: state.create.get('metamask_account')
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    createDataloftAccountRequest,
    createMetamaskAccountRequest,
  }, dispatch)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)