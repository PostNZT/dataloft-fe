import React from 'react'
import CubeSpinner from 'react-spinners-kit/'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  loader: {
    width: 'max-content',
    margin: '0 auto',
  }
})

const Cubeloader = ({ loading, top = 30, size, style = {} }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {loading && (
        <div style={{ paddingTop: top, ...style }} className={classes.loader}>
          <CubeSpinner
            size={size}
            color="#FF3939"
            loading={true}
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Cubeloader
