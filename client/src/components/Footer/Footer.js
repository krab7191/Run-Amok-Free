import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DrinkIcon from '@material-ui/icons/LocalDrink';
import UpdateIcon from '@material-ui/icons/Update';
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';
import NotesIcon from '@material-ui/icons/Notes';

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
    this.setState({ value }, 
      () => {
        return (
          this.props.history.push(this.state.value)
        )
      }
    )
  }

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
          className={classes.icon} 
          label="Tasting" 
          icon={<DrinkIcon />} 
          value="/Tasting" 
        />
        <BottomNavigationAction 
          className={classes.icon} 
          label="Manage Meads" 
          icon={<UpdateIcon />}
          value="/ManageBevs"  
        />
        <BottomNavigationAction 
          className={classes.icon} 
          label="Manage Users" 
          icon={<UsersIcon />} 
          value="/ManageUsers"  
        />
        <BottomNavigationAction 
          className={classes.icon} 
          label="Notes" 
          icon={<NotesIcon />} 
          value="/Notes"
        />
      </BottomNavigation>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SimpleBottomNavigation));
