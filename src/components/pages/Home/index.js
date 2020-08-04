import React, { useCallback, useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { 
  AppBar, 
  TabPanel,
  UploadAccordion,
  ConfigModal
} from 'components'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { bindActionCreators } from 'redux'
import { 
  FilecoinIcon,
} from 'components/elements'

import { 
  cardThemeBackground,
  whiteText
} from 'services/styles'

import { 
  PlusIcon,
} from 'components/elements'

import {
  decryptDataFileRequest
} from 'store/decrypt/actions'

import { 
  encryptDataFileRequest 
} from 'store/encrypt/actions'

import {
  encryptMultipleDataFilesRequest
} from 'store/encryptMultiple/actions'

import {
  handleFiles
} from 'services/handleFiles'

import classNames from 'classnames'
import { Typography } from '@material-ui/core'

const styles = (theme) => ({
  cardThemeBackground,
  whiteText,
  paper: {
    width: '100%',
    marginTop: 15, 
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  button: {
    borderRadius: 50,
  },
  accordion: {
    left: '71%',
    right: 15,
    position: 'fixed',
    bottom: 15,
    width: '28%',
  },
  activeBadgeColor : {
    background: 'lightgreen !important'
  }
})

const Home = (props) => {
  const {
    classes,
    encryptDataFileRequest,
    decryptDataFileRequest,
    encryptMultipleDataFilesRequest
  } = props

  // const dropzoneRef = createRef()
  const [hasFile, setHasFile] = useState(false)
  const [openConfigModal, setOpenConfigModal] = useState(false)
  
  // const handleUploadButton = () => {
  //   if (dropzoneRef.current) {
  //     dropzoneRef.current.open()
  //   }
  // }

  const onDrop = useCallback( async (fileList) => {    
    const mode = await handleFiles(fileList)
    
    const key = 'HACKFS2020WEWINASONE'
    const hint = 'HACKFS2020WEWINASONE'
    
    if (mode === 'encrypt') {
      encryptDataFileRequest(fileList, key, hint)
    } else if (mode === 'encrypt-multiple') {
      encryptMultipleDataFilesRequest(fileList, key, hint)
    } else if (mode === 'decrypt') {
      decryptDataFileRequest(fileList, key)
    }
    setHasFile(true)
  }, [encryptDataFileRequest, encryptMultipleDataFilesRequest, decryptDataFileRequest])

  const handleUploadFile = () => {
    setHasFile(true)
    setOpenConfigModal(true)
  }

  const handleCloseConfigModal = () => {
    setOpenConfigModal(false)
    setHasFile(false)
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  
  return (
    <React.Fragment>
      <AppBar />
      <Container maxWidth="xl">
        <Grid container spacing={0} style={{ paddingTop: 10 }} >
          <Grid item xs={3} className={classNames(classes.paper, classes.cardThemeBackground, classes.whiteText)}>
            <div style={{ paddingLeft: 15 }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<PlusIcon />}
                size="large"
                // onClick={handleUploadButton}
              >
                Upload
              </Button>
              
            </div>
            
            <Grid item xs={12}>
              <Typography 
                variant="body1" 
                className={classes.whiteText}
              >
                Network Stats
              </Typography>
              <Badge
                color="error"
                variant="dot"
                overlap="circle"
                classes={{ badge: classes.activeBadgeColor}}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <FilecoinIcon />
              </Badge>
            </Grid>
          </Grid>

          
          <Grid item xs={9} className={classNames(classes.paper, classes.cardThemeBackground, classes.whiteText)}>
          <div {...getRootProps()}>
              <input {...getInputProps()} />
            <Grid container style={{ paddingBottom: 15 }}>
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  component="h2"
                  className={classes.whiteText}
                >
                  Quick Access
                </Typography>

               
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs={2}>
                <TabPanel />
              </Grid>
              <Grid item xs={2}>
                <TabPanel />
              </Grid>
              <Grid item xs={2}>
                <TabPanel />
              </Grid>
              <Grid item xs={2}>
                <TabPanel />
              </Grid>
              <Grid item xs={2}>
                <TabPanel />
              </Grid>
            </Grid> */}

              <Grid container style={{ paddingBottom: 15, paddingTop: 15 }}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    component="h2"
                    className={classes.whiteText}
                  >
                    Files
                  </Typography>
                </Grid>
              </Grid>
              

            <Grid container>
              <Grid item xs={3}>
                <TabPanel />
              </Grid>
              <Grid item xs={3}>
                <TabPanel />
              </Grid>
              <Grid item xs={3}>
                <TabPanel />
              </Grid>
              <Grid item xs={3}>
                <TabPanel />
              </Grid>
            </Grid>
        
            </div>
          </Grid>
          
        </Grid>
          {
            hasFile && (
              <React.Fragment>
                <UploadAccordion 
                  className={classes.accordion}
                  handleUploadFile={handleUploadFile}
                />
              </React.Fragment>
            )
          }
          {
            openConfigModal && (
              <React.Fragment>
                <ConfigModal 
                  onClose={handleCloseConfigModal}
                  open={openConfigModal}
                />
              </React.Fragment>
            )
          } 
      </Container>
    </React.Fragment>
  )

}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    encryptDataFileRequest,
    decryptDataFileRequest,
    encryptMultipleDataFilesRequest
  }, dispatch)
})


export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(Home)