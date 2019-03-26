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
// import { MyContext } from '../MyContext/MyContext';

const styles = {
  root: {
    width: '100%',
    backgroundColor: 'brown !important',
    position: 'fixed',
    bottom: 0,
    height: '60px'
  },
  icon: {
    color: 'white !important'
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  renderLink = () => {
      let result = "";
      switch (this.state.value) {
          case 0: 
            result = '/Tasting';
            break;
          case 1: 
            result = '/ManageBevs';    
            break;
          case 2: 
            result = '/ManageUsers';    
            break;
          case 3: 
            result = '/Notes';    
            break;
          default: 
            result = '/';
      }
      console.log(result);
      return (
        this.props.history.push(result)
      )
  }

  handleChange = (event, value) => {
    this.setState({ value }, 
        () => this.renderLink()
    )
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log(this.props);

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction className={classes.icon} label="Tasting" icon={<DrinkIcon />} />
        <BottomNavigationAction className={classes.icon} label="Manage Meads" icon={<UpdateIcon />} />
        <BottomNavigationAction className={classes.icon} label="Manage Users" icon={<UsersIcon />} />
        <BottomNavigationAction className={classes.icon} label="Notes" icon={<NotesIcon />} />
      </BottomNavigation>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleBottomNavigation));