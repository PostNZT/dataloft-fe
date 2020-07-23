import React from 'react'

const CreateAccountCard = () => {
  return (
    <React.Fragment>
     <div style={{ paddingBottom: 20, paddingRight: 24, paddingLeft: 15 }}>
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          onClick={handleClickLogin}
          fullWidth
        >
          Continue 
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

export default CreateAccountCard