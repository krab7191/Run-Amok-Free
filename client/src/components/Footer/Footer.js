import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import DrinkIcon from "@material-ui/icons/LocalDrink";
import UpdateIcon from "@material-ui/icons/Update";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import NotesIcon from "@material-ui/icons/Notes";
import { Link } from "react-router-dom";

const styles = {
  root: {
    width: "100%",
    backgroundColor: "brown !important",
    position: "fixed",
    bottom: 0,
    height: "60px"
  },
  icon: {
    color: "white !important"
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={Link}
          to="/Tasting"
          className={classes.icon}
          label="Tasting"
          icon={<DrinkIcon />}
          value="Tasting"
        />
        <BottomNavigationAction
          component={Link}
          to="/ManageBevs"
          className={classes.icon}
          label="Manage Meads"
          icon={<UpdateIcon />}
          value="ManageBevs"
        />
        <BottomNavigationAction
          component={Link}
          to="/ManageUsers"
          className={classes.icon}
          label="Manage Users"
          icon={<UsersIcon />}
          value="ManageUsers"
        />
        <BottomNavigationAction
          component={Link}
          to="/Notes"
          className={classes.icon}
          label="Notes"
          icon={<NotesIcon />}
          value="Notes"
        />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);
