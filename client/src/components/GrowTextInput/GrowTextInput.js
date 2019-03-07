import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 46,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
    marginTop: "5px"
  },
  button: {
    position: "absolute",
    bottom: "5px",
    right: "10px"
  }
});

class GrowTextInput extends React.Component {

  render() {
    const { classes,checked } = this.props;

    const polygon = (
      <Paper elevation={4} className={classes.paper}>
        <TextField
          id="filled-multiline-static"
          label="Comment?"
          multiline
          rows="8"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <Button className={classes.button}>Submit</Button>
      </Paper>
    );

    return (
          /* Conditionally applies the timeout property to change the entry speed. */
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {polygon}
          </Grow>
    )
  }
}

GrowTextInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GrowTextInput);