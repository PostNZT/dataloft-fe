import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import compose from 'recompose/compose'

const styles = (theme) => ({
  root: {
    maxWidth: 290,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
})

const TabPanel = (props) => {
  const { classes, dataFiles } = props

  const { name, path } = dataFiles


  const coverMedia = "https://images.pexels.com/photos/20787/pexels-photo.jpg"

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={coverMedia}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {`@${name}`}
          </Typography>
          <Typography variant="p" color="textSecondary" component="p">
            {`@${path}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default compose(
  withStyles(styles)
)(TabPanel)