import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
  colorSwitchBase: {
    color: green[50],
    "&$colorChecked": {
      color: green[500],
      "& + $colorBar": {
        backgroundColor: green[300]
      }
    }
  },
  colorBar: {},
  colorChecked: {},
  button: {
    margin: theme.spacing.unit
  }
});

class UserTableRow extends React.Component {
  render() {
    const {
      _id,
      firstName,
      lastName,
      email,
      username,
      isAdmin,
      createdOn,
      handleSwitchToggle,
      readable,
      classes
    } = this.props;

    return (
      <TableRow key={_id}>
        <TableCell align="center" component="th" scope="row" padding="none">
          {firstName}
        </TableCell>
        <TableCell align="center" component="th" scope="row" padding="none">
          {lastName}
        </TableCell>
        <TableCell align="center">
          <Button onClick={this.blahblah} className={classes.button}>
            {email}
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button className={classes.button}>{username}</Button>
        </TableCell>
        <TableCell align="center">
          <Switch
            classes={{
              switchBase: classes.colorSwitchBase,
              bar: classes.colorBar,
              checked: classes.colorChecked
            }}
            checked={isAdmin}
            onChange={e => handleSwitchToggle(e, _id)}
            _id={_id}
          />
          {/* {isAdmin===true ? "Yes" : "No"} */}
        </TableCell>
        <TableCell align="right">{readable(createdOn)}</TableCell>
      </TableRow>
    );
  }
}

UserTableRow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserTableRow);
