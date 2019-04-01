import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import nanoid from "nanoid";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";

import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import TextSMS from "@material-ui/icons/Textsms";
import SlideInToken from "../SlideInToken";
import Switch from "../Switch";
import Button from "@material-ui/core/Button";

import "./AddUser.css";
import { green } from "@material-ui/core/colors";

// Tooltip
import ReactTooltip from "react-tooltip";

// Toast notifications
import { toast } from "react-toastify";
import toastNotifier from "../../utils/toast";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 1.8,
    background: green[300]
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit * 1.8,
  },
  dense: {
    marginTop: 16
  },
  normalCase: {
    textTransform: "none"
  },
  hidden: {
    display: "none"
    // visibility: "hidden"
  }
});

class AddUser extends React.Component {
  state = {
    email: "",
    open: false,
    token: null,
    oneTimeToken: true,
    validTokens: []
    // clipboardValue: ""
  };

  handleClickOpen = token => {
    this.setState({ open: true, token: token });
  };

  handleClose = () => {
    this.setState({ open: false, token: null });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      email: value
    });
  };

  oneTimeToken = e => {
    this.setState({
      oneTimeToken: e.target.checked
    });
  };

  sendToken = email => {
    const tokenid = nanoid(8);
    AUTH.sendToken({
      email: email,
      token: tokenid,
      deleteOnRead: this.state.oneTimeToken
    })
      .then(value => {
        console.log(value);
        this.handleClickOpen(tokenid);
        this.getValidTokens();
        this.setState({ email: "" });
      })
      .catch(err => {
        this.setState({ email: "" });
        toastNotifier.notify(
          `Please enter a valid email`,
          "error",
          2200,
          toast
        );
      });
  };

  getValidTokens = () => {
    API.getValidTokens()
      .then(resp => {
        const { data } = resp;
        let tokens = [];
        data.forEach(t => {
          tokens.push(t.token);
        });
        this.setState({
          validTokens: tokens
        });
      })
      .catch(err => {
        console.error(`Error getting valid tokens: ${err}`);
      });
  };

  // Hacky way of getting button value into clipboard
  copyToClipboard = val => {
    const clippy = document.createElement("input");
    document.body.appendChild(clippy);
    clippy.setAttribute("value", val);
    clippy.select();
    document.execCommand("copy");
    document.body.removeChild(clippy);
    // function notify (text, type, duration, toast)
    toastNotifier.notify(`${val} copied to clipboard.`, "info", 1500, toast);
  };

  componentWillMount() {
    this.getValidTokens();
  }

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
        <div id="one-time-token" className={classNames(classes.textField,classes.dense)}>
          <p>One time token?</p>
          <Switch
            isAvailable={this.state.oneTimeToken}
            handleToggle={this.oneTimeToken}
          />
        </div>
        <Fab
          onClick={() => this.sendToken(this.state.email)}
          variant="extended"
          aria-label="Token"
          className={classNames(classes.fab,classes.dense)}
        >
          <TextSMS className={classes.extendedIcon} />
          Send Token
        </Fab>
        <ReactTooltip
          globalEventOff="click"
          type="info"
          id="global-tooltip"
          aria-haspopup="true"
        >
          <p>Click a token to copy it to your clipboard.</p>
          <p>
            These tokens are valid for any bearer, and expire 5 days from
            creation.
          </p>
          <p>
            One time tokens are deleted after someone with the associated email
            address signs up.
          </p>
        </ReactTooltip>
        <div 
          id="valid-tokens-container" 
          className={classNames(classes.textField,classes.dense)} 
          data-tip 
          data-for="global-tooltip"
        >
          <p className={classes.textField}>Sign-up Tokens:{" "}</p>
          {this.state.validTokens.map((token, i) => (
            <span key={i}>
              <Button
                className={classes.normalCase}
                variant="contained"
                color="primary"
                onClick={() => this.copyToClipboard(token)}
              >
                {token}
              </Button>
              &nbsp;
            </span>
          ))}
        </div>
        <SlideInToken
          close={this.handleClose}
          open={this.state.open}
          token={this.state.token}
        />
      </div>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddUser);
