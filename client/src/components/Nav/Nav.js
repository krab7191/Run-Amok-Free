import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import SideLeftMenu from "../SideMenu/SideLeftMenu";
import SideRightMenu from "../SideMenu/SideRightMenu";

import { MyContext } from "../MyContext/MyContext";

import "./Nav.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  name: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    padding: "10px"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionLeftMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  sectionRightMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorPageEl: null,
      left: false,
      right: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePageMenuOpen = event => {
    this.setState({ anchorPageEl: event.currentTarget });
  };

  handlePageMenuClose = () => {
    this.setState({ anchorPageEl: null });
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => {
          const { anchorEl, anchorPageEl } = this.state;
          const { classes } = this.props;
          const isMenuOpen = Boolean(anchorEl);
          const isPageMenuOpen = Boolean(anchorPageEl);
          const { isAdmin, isLoggedIn } = context.myState;
          const handleLogout = context.handleLogout;

          const handleLogoutClose = () => {
            this.setState({
              anchorEl: null
            });
            handleLogout();
          };
          const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={handleLogoutClose}>Logout</MenuItem>
            </Menu>
          );

          const renderPageMenu = (
            <Menu
              anchorEl={anchorPageEl}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={isPageMenuOpen}
              onClose={this.handlePageMenuClose}
            >
              <MenuItem onClick={this.handlePageMenuClose}>
                <Link to="/Tasting">Tasting</Link>
              </MenuItem>
              {isAdmin ? (
                <MenuItem onClick={this.handlePageMenuClose}>
                  <Link to="/ManageBevs">Manage Meads</Link>
                </MenuItem>
              ) : null}
              {isAdmin ? (
                <MenuItem onClick={this.handlePageMenuClose}>
                  <Link to="/ManageUsers">Manage Users</Link>
                </MenuItem>
              ) : null}
              <MenuItem onClick={this.handlePageMenuClose}>
                <Link to="/Notes">Notes</Link>
              </MenuItem>
            </Menu>
          );

          return (
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  {!isAdmin && (
                    <>
                      <IconButton
                        className={classes.menuButton}
                        aria-haspopup="true"
                        onClick={this.handlePageMenuOpen}
                        color="inherit"
                        aria-label="Open drawer"
                      >
                        <MenuIcon />
                      </IconButton>
                      <div className={classes.sectionLeftMobile}>
                        <IconButton
                          aria-haspopup="true"
                          onClick={this.toggleDrawer("left", true)}
                          color="inherit"
                        >
                          <MenuIcon />
                        </IconButton>
                      </div>
                      <SideLeftMenu
                        open={this.state.left}
                        toggle={this.toggleDrawer}
                        isAdmin={isAdmin}
                      />
                    </>
                  )}
                  <Typography
                    className={classes.title}
                    variant="h6"
                    color="inherit"
                    noWrap
                  >
                    Run-Amok
                  </Typography>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Typography
                      className={classes.name}
                      variant="h5"
                      color="inherit"
                      noWrap
                    >
                      {isLoggedIn
                        ? `Welcome, ${context.myState.user.firstName}`
                        : null}
                    </Typography>
                    {isLoggedIn && (
                      <IconButton
                        aria-owns={isMenuOpen ? "material-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    )}
                  </div>
                  <div className={classes.sectionRightMobile}>
                    <IconButton
                      aria-haspopup="true"
                      onClick={this.toggleDrawer("right", true)}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                  <SideRightMenu
                    open={this.state.right}
                    toggle={this.toggleDrawer}
                    loggedIn={isLoggedIn}
                    logout={handleLogoutClose}
                  />
                </Toolbar>
              </AppBar>
              {isLoggedIn && renderMenu}
              {renderPageMenu}
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
