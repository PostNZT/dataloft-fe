import React from 'react'
import Button from '@material-ui/core/Button'


const Login = (props) => {

  const handleClickLogin = () => {

  }

  return (
    <React.Fragment>
      <h1> LOGIN </h1>
      <Button 
        variant="contained" 
        color="primary"
        type="submit"
        onClick={handleClickLogin}
      >
        Login with Metamask
      </Button>
    </React.Fragment>
  )
}

export default Login