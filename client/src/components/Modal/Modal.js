import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';

function getModalStyle() {

  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    [theme.breakpoints.down('md')]: {
      width: '60% !important',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70% !important',
    },
  },
  note: {
      color: "green",
      fontWeight: 400,
      fontSize: "1.5rem"
  },
  fab: {
    margin: theme.spacing.unit,
    left: "80%"
  },
});

class SimpleModal extends React.Component {

  render() {
    const { classes, open, close, bev, note } = this.props;

    const clickBtnHandler = () => {
        close();
    }

    return (
      <div>
        { open ?
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
                Note Added to {bev.name}:
            </Typography>
            <Typography className={classes.note} variant="subtitle1" id="simple-modal-description">
                {note}
            </Typography>
            <Fab onClick={clickBtnHandler} variant="extended" aria-label="Exit" className={classes.fab}>
                Exit
            </Fab>
            <SimpleModalWrapped />
          </div>
        </Modal> : null }
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
