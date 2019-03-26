import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import NotesIcon from "@material-ui/icons/Notes";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

const styles = {
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    height: "60px",
    borderTop: "2px solid #3E50B5"
  },
  icon: {
    paddingRight: "10px"
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: "Tasting"
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
        // showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={Link}
          to="/Tasting"
          label="Tasting"
          icon={
            <Icon className={classNames(classes.icon, "fas fa-glass-cheers")} />
          }
          value="Tasting"
        />
        <BottomNavigationAction
          component={Link}
          to="/ManageBevs"
          label="Meads"
          icon={
            <Icon className={classNames(classes.icon, "fas fa-wine-bottle")} />
          }
          value="ManageBevs"
        />
        <BottomNavigationAction
          component={Link}
          to="/ManageUsers"
          label="Users"
          icon={<UsersIcon />}
          value="ManageUsers"
        />
        <BottomNavigationAction
          component={Link}
          to="/Notes"
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
