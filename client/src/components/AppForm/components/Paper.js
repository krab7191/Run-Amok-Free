import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MuiPaper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      main: '#e0e0e0',
    },
  },
});

const styles = theme => ({
  background: {
    backgroundColor: theme.palette.secondary.main,
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
        classes["background"],
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
  background: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  padding: PropTypes.bool,
};

Paper.defaultProps = {
  background: 'main',
  padding: false,
};

export default withStyles(styles(theme))(Paper);