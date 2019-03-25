import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
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
      console.log(this.state);
      let result = "";
      switch (this.state.value) {
          case 0: 
            console.log('Got here!');
            result = '/Tasting';
            break;
          case 1: 
            console.log('Got here!');
            result = '/ManageMeads';    
            break;
          default:
            console.log("Nowhere!");
      }
      console.log(result);
      return (
        <Redirect to={result} />
      )
  }

  handleChange = (event, value) => {
    this.setState({ value }, () => 
        this.renderLink()
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

export default withStyles(styles)(SimpleBottomNavigation);