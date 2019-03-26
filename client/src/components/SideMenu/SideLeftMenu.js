import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import NotesIcon from "@material-ui/icons/Notes";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

const styles = {
  list: {
    width: 200
  },
  icon: {
    paddingRight: "10px"
  }
};

class LeftDrawer extends React.Component {
  render() {
    const { classes, open, toggle, isAdmin } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemText primary="Run-Amok" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Icon
                className={classNames(classes.icon, "fas fa-glass-cheers")}
              />
            </ListItemIcon>
            <Link to="/Tasting">Tasting</Link>
          </ListItem>
          {isAdmin ? (
            <ListItem button>
              <ListItemIcon>
                <Icon
                  className={classNames(classes.icon, "fas fa-wine-bottle")}
                />
              </ListItemIcon>
              <Link to="/ManageBevs">ManageMeads</Link>
            </ListItem>
          ) : null}
          {isAdmin ? (
            <ListItem button>
              <ListItemIcon>
                <UsersIcon className={classes.icon} />
              </ListItemIcon>
              <Link to="/ManageUsers">ManageUsers</Link>
            </ListItem>
          ) : null}
          <ListItem button>
            <ListItemIcon>
              <NotesIcon className={classes.icon} />
            </ListItemIcon>
            <Link to="/Notes">Notes</Link>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          open={open}
          onClose={toggle("left", false)}
          onOpen={toggle("left", true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={toggle("left", false)}
            onKeyDown={toggle("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeftDrawer);
