import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import Sync from '@material-ui/icons/Sync';

const styles = {
  list: {
    width: 250,
  },
};

class RightDrawer extends React.Component {
  
  render() {

    const { classes,open,toggle,loggedIn,logout } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem button>
              <ListItemText primary="Run-Amok" />
            </ListItem>
          </List>
        <Divider />
        <List>
          {loggedIn ? 
            <ListItem button>
              <ListItemIcon>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>: null }
          {loggedIn ? 
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <IconButton color="inherit">
                  <Close />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem> : 
            <ListItem button>
              <ListItemIcon>
                <IconButton color="inherit">
                  <Sync />
                </IconButton>
              </ListItemIcon>
              <Link to="/sign-in">
                <ListItemText primary='Login' />
              </Link> />
            </ListItem> }
        </List>
        {/* <Divider /> */}
      </div>
    );
    
    console.log(this.props);
    
    return (
      <div>
        {/* <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button> */}

        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={toggle('right', false)}
          onOpen={toggle('right', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={toggle('right', false)}
            onKeyDown={toggle('right', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

RightDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightDrawer);