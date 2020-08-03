import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

const UploadAccordion = (props) => {
  const { classes, handleUploadFile, file_info, className } = props
  const { filename, key, hint } = file_info

  const handleUploadFileButton = () => {
    handleUploadFile(false)
  }
  
  return (
    <div className={classes.root}>
      <Accordion className={className} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General Upload Info</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Typography>
            File Name: &nbsp; {filename}
            <br />
            Password: &nbsp;{key}
            <br />
            Hint: &nbsp; {hint}
          </Typography>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button 
            size="small"
            onClick={handleUploadFileButton}
          >
            Upload
          </Button>
        </AccordionActions>
      </Accordion>
    
    </div>
  )
}


const mapStateToProps = (state) => ({
  file_info: state.encrypt.get('encrypted_data'),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(UploadAccordion)
