import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import "./Nav.css";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
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
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    anchorPageEl: null,
    mobileMoreAnchorEl: null,
    isAdmin: true
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handlePageMenuOpen = event => {
    this.setState({ anchorPageEl: event.currentTarget });
  };

  handlePageMenuClose = () => {
    this.setState({ anchorPageEl: null });
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, anchorPageEl, mobileMoreAnchorEl} = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isPageMenuOpen = Boolean(anchorPageEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {this.state.isAdmin  ? <MenuItem onClick={this.handleMenuClose}>Admin</MenuItem> : null}
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderPageMenu = (
      <Menu
        anchorEl={anchorPageEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isPageMenuOpen}
        onClose={this.handlePageMenuClose}
      >
        {/* <MenuItem onClick={this.handlePageMenuClose}><Link to="/ListOrder">List</Link></MenuItem> */}
        <MenuItem onClick={this.handlePageMenuClose}><Link to="/Tasting">Tasting</Link></MenuItem>
        { this.state.isAdmin ? <MenuItem onClick={this.handlePageMenuClose}><Link to="/EditableDataTable">ManageMeads</Link></MenuItem> : null }
        { this.state.isAdmin ? <MenuItem onClick={this.handlePageMenuClose}><Link to="/ManageUsers">ManageUsers</Link></MenuItem> : null }
        <MenuItem onClick={this.handlePageMenuClose}><Link to="/Notes">Notes</Link></MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              aria-haspopup="true" 
              onClick={this.handlePageMenuOpen} 
              color="inherit" 
              aria-label="Open drawer">
                <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Run-Amok
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderPageMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);


// import { fade } from '@material-ui/core/styles/colorManipulator';
// import InputBase from '@material-ui/core/InputBase';
// import SearchIcon from '@material-ui/icons/Search';
              // <div className={classes.search}>
              //   <div className={classes.searchIcon}>
              //     <SearchIcon />
              //   </div>
              //   <InputBase
              //     placeholder="Search…"
              //     classes={{
              //       root: classes.inputRoot,
              //       input: classes.inputInput,
              //     }}
              //   />
              // </div>

              // search: {
              //   position: 'relative',
              //   borderRadius: theme.shape.borderRadius,
              //   backgroundColor: fade(theme.palette.common.white, 0.15),
              //   '&:hover': {
              //     backgroundColor: fade(theme.palette.common.white, 0.25),
              //   },
              //   marginRight: theme.spacing.unit * 2,
              //   marginLeft: 0,
              //   width: '100%',
              //   [theme.breakpoints.up('sm')]: {
              //     marginLeft: theme.spacing.unit * 3,
              //     width: 'auto',
              //   },
              // },
              // searchIcon: {
              //   width: theme.spacing.unit * 9,
              //   height: '100%',
              //   position: 'absolute',
              //   pointerEvents: 'none',
              //   display: 'flex',
              //   alignItems: 'center',
              //   justifyContent: 'center',
              // },
              // inputRoot: {
              //   color: 'inherit',
              //   width: '100%',
              // },
              // inputInput: {
              //   paddingTop: theme.spacing.unit * 1.5,
              //   paddingRight: theme.spacing.unit,
              //   paddingBottom: theme.spacing.unit,
              //   paddingLeft: theme.spacing.unit * 10,
              //   fontSize:'1.25rem',
              //   transition: theme.transitions.create('width'),
              //   width: '100%',
              //   [theme.breakpoints.up('md')]: {
              //     width: 200,
              //   },
              // },