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
import lightBlue from "@material-ui/core/colors/lightBlue";
import Switch from "../Switch";
import Button from "@material-ui/core/Button";

import { CopyToClipboard } from "react-copy-to-clipboard";

import "./AddUser.css";

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
  },
  normalCase: {
    textTransform: "none"
  }
});

class AddUser extends React.Component {
  state = {
    email: "",
    open: false,
    token: null,
    oneTimeToken: true,
    validTokens: []
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
        console.log(err.response.data.Error);
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

  copyToClipboard = ({ target: { innerHTML } }) => {
    alert(`${innerHTML} copied to clipboard`);
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
        One time token? &nbsp;&nbsp;
        <Switch
          className="token-switch"
          isAvailable={this.state.oneTimeToken}
          handleToggle={this.oneTimeToken}
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
        <div>
          Valid tokens:{" "}
          {this.state.validTokens.map((token, i) => (
            <span key={i}>
              <CopyToClipboard text={token}>
                <Button
                  className={classes.normalCase}
                  variant="contained"
                  color="primary"
                  onClick={this.copyToClipboard}
                >
                  {token}
                </Button>
              </CopyToClipboard>
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
