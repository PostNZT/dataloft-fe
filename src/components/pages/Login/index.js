import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles, fade } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import classNames from 'classnames'

import { createFFSRequest } from 'store/create/actions'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import compose from 'recompose/compose'


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
  loginPage: {
    position: 'relative',
    borderRadius: 5,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
  }
})

const Login = (props) => {
  const {
    classes,
    createFFSRequest,
  } = props

  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert(
      "Metamask is not installed. Get Metamask Plugin https://https://metamask.io/"
    );
  }

  const handleClickLogin = async () => {
    const account = await window.ethereum.enable()
    const address = account[0]
    createFFSRequest(address)
  }

  return (
    <div className={classNames(classes.page, classes.loginPage)}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <h1> DATALOFT </h1>
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          onClick={handleClickLogin}
        >
          Login with Metamask
        </Button>
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