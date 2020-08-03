import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'
import compose from 'recompose/compose'
import { 
  whiteText
} from 'services/styles'


const styles = (theme) => ({
  whiteText,

  background: {
    default: "#222222"
  },
  text: {
    primary: "#ffffff"
  }
})


const ConfigModal = (props) => {
  const { open, onClose, classes } = props


  return(
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Configure Storing File Option:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This would enable Dataloft to give you secure encryption and decryption of your file that will be stored in the IPFS and Filecoin Network. 
            Dataloft ensures that the integrity of your file makes it impossible to manipulate data file without the correct password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Minimum Deal Duration (in seconds)"
            type="text"
            fullWidth
            inputProps={{ 
              type: 'number' 
            }} 
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Excluded Miners List"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Trusted Miners List"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Threshold"
            type="text"
            fullWidth
            inputProps={{ 
              type: 'number' 
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Max Price"
            type="text"
            fullWidth
            inputProps={{ 
              type: 'number' 
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Disapprove
          </Button>
          <Button onClick={onClose} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default compose(
  withStyles(styles)
)(ConfigModal)