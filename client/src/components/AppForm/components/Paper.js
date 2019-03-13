import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MuiPaper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  background: {
    backgroundColor: '#e0e0e0'
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

function Paper(props) {

  const { background, classes, className, padding, ...other } = props;
  
  return (
    <MuiPaper
      elevation={0}
      square
      className={classNames(
        {
          [classes.background]: background,
        },
        {
          [classes.padding]: padding,
        },
        className,
      )}
      {...other}
    />
  );
}

Paper.propTypes = {
  background: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  padding: PropTypes.bool,
};

Paper.defaultProps = {
  background: true,
  padding: true,
};

export default withStyles(styles)(Paper);