import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

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
})

const Login = (props) => {
  const {
    user,
    classes,
    createFFSRequest,
  } = props

  console.log(user)
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
    <React.Fragment>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <h1> LOGIN </h1>
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          onClick={handleClickLogin}
        >
          Login with Metamask
        </Button>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  // user: state.app.user
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