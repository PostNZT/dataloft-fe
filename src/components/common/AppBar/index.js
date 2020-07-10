import React, { useState } from 'react'
import { fade, withStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
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
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import { compose } from 'recompose'


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
  const { classes } = props
  const [anchorElement, setAnchorElement] = useState(null)
  const [mobileAnchorElement, setMobileAnchorElement] = useState(null)

  const isMenuOpen = Boolean(anchorElement)
  const isMobileMenuOpen = Boolean(mobileAnchorElement)

  const handleProfileMenuOpen = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileAnchorElement(null)
  }

  const handleMenuClose = () => {
    setAnchorElement(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorElement(event.currentTarget);
  }

  const menuId = 'account-menu'
  const renderMenu = (
    <Menu 
      anchorElement = {anchorElement}
      anchorOrigin = {{ vertical: 'top', horizontal: 'right' }}
      id = {menuId}
      keepMounted
      transformOrigin = {{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorElement = {mobileAnchorElement}
      anchorOrigin= {{ vertical: 'top', horizontal: 'right' }}
      id = {mobileMenuId}
      keepMounted
      transformOrigin = {{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <AddIcon />
        </IconButton>
        <p>Create</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>  
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>

  )

  return (
    <React.Fragment>
      <div className={classes.grow}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            DATALOFT
          </Typography>
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
            <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
              <AddIcon />
            </Fab>
            <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </Fab>
            <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
              <KeyboardArrowDownIcon />
            </Fab>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </MuiAppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </React.Fragment>
  )
}

export default compose(
  withStyles(styles),
)(AppBar)