import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, TabPanel } from 'components'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import { 
  cardThemeBackground,
  whiteText
} from 'services/styles'

import { 
  PlusIcon,
} from 'components/elements'

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
})

const Home = (props) => {
  const {
    classes
  } = props

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
              >
                Create
              </Button>
            </div>
          </Grid>
          
          <Grid item xs={9} className={classNames(classes.paper, classes.cardThemeBackground, classes.whiteText)}>
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
            <Grid container style={{ paddingTop: 15}}>
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
          </Grid>
        </Grid>
        
      </Container>
    </React.Fragment>
  )

}

export default compose(
  withStyles(styles)
)(Home)