import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MyContext } from '../MyContext/MyContext';

const styles = theme => ({

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paper: {
    position: 'relative',
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    outline: 'none',
    marginTop: "5px",
    boxShadow: "none",
    borderRadius: "none"
  },
  button: {
    position: "absolute",
    bottom: "5px",
    right: "40px"
  }
});

class GrowTextInput extends React.Component {

  state = {
    note: ""
  }

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({
      note: value
    });
  };

  render() {
    const { closeInput,classes,checked } = this.props;
    return (
      <MyContext.Consumer>
        {context => {
          const handleNoteInput = (e) => {
            context.postNote(e,this.state.note);
            closeInput();
            alert("Added Note!");
          }

          const myTextBox = (
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
                onChange={this.handleInputChange}
              />
              <Button 
                onClick={handleNoteInput} 
                className={classes.button}
                >Submit</Button>
            </Paper>
          );

          return (
            /* Conditionally applies the timeout property to change the entry speed. */
            <Grow
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              {myTextBox}
            </Grow>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

GrowTextInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GrowTextInput);