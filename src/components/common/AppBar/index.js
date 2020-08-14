import React from 'react'
import { fade, withStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import SearchIcon from '@material-ui/icons/Search'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import Avatar from '@material-ui/core/Avatar'

import { 
  BrandIcon, 
  ProfileIcon
} from 'components/elements'
import { 
  signOutUserRequest 
} from 'store/auth/actions'
import { connect } from 'react-redux'

const styles = (theme) => ({
  grow: {
    flexGrow: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '65ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  leftAdjust: {
    marginLeft: 10,
  },
})


const AppBar = (props) => {
  const { dataloft_user, classes, signOutUserRequest, children } = props
  const { username } = dataloft_user
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickLogout = () => {
    signOutUserRequest()
  }

  return (
    <React.Fragment>
      <div className={classes.grow}>
      <MuiAppBar position="static">
        <Toolbar>
          <BrandIcon height={70} style={{ paddingLeft: 15, paddingTop: 15 }}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search on Dataloft…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Avatar className={classes.leftAdjust}>
              <ProfileIcon />
            </Avatar>
            <Typography 
              variant="subtitle1" 
              className={classes.leftAdjust}
              style={{ paddingTop: 5 }}
              >
                { 
                  username 
                }

                {
                  !username && (
                    <React.Fragment>
                      postnzt
                    </React.Fragment>
                  )
                }
            </Typography>
            <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
              <AddIcon />
            </Fab>
            <Fab color="secondary" size="small" aria-label="notification" className={classes.leftAdjust}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </Fab>
            <Fab 
              color="secondary" 
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              className={classes.leftAdjust}
            >
              <KeyboardArrowDownIcon />
            </Fab>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              classes={{
                root: classes.inputRoot
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
          
          </div>
        </Toolbar>
      </MuiAppBar>
    </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  dataloft_user: state.auth.get('dataloft_user')
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    signOutUserRequest
  }, dispatch)
})
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AppBar)