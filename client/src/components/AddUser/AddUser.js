import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import nanoid from "nanoid";
import AUTH from "../../utils/AUTH";

import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import TextSMS from "@material-ui/icons/Textsms";
import lightBlue from "@material-ui/core/colors/lightBlue";

import './AddUser.css';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 1.8,
    background: lightBlue[300]
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  }
});

class AddUser extends React.Component {
  state = {
    email: ""
  };

  handleChange = e => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      email: value
    });
  };

  sendToken = email => {
    const tokenid = nanoid(8);  
    AUTH.sendToken({ email: email, token: tokenid }).then(value => {
      console.log(value);
      this.setState({ email: "" });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div id="mailer-row">
        <TextField
          id="email"
          label="Email"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Fab
          onClick={() => this.sendToken(this.state.email)}
          variant="extended"
          aria-label="Token"
          className={classes.fab}
        >
          <TextSMS className={classes.extendedIcon} />
          Send Token
        </Fab>
      </div>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddUser);
