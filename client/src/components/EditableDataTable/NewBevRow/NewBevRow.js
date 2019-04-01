// @author Karsten Rabe

// Boilerplate + utilities
import React, { Component } from "react";
import API from "../../../utils/API";
import "./NewBevRow.css";

// Import the MAT UI table comps
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button/Button";

import Icon from "@material-ui/core/Icon";

// Material UI theming
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const greenTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: green[300]
    }
  }
});

const styles = theme => ({
  name: {
    width: "30%"
  },
  description: {
    width: "100%"
  },
  saveButton: {
    width: "115px"
  },
  form: {
    width: "99%"
  }
});

class NewBevRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  handleKeyup = e => {
    if (e.key === "Enter") {
      this.saveHandler();
    }
  };

  fieldChangeHandler = (e, which) => {
    this.setState({
      [which]: e.target.value
    });
  };

  saveHandler = () => {
    const { name, description } = this.state;
    if (name.trim().length === 0 || description.trim().length === 0) {
      alert("Fill out the name and the description!");
      return;
    } else {
      alert("Saving...");
      API.saveNewBeverage(this.state).then(resp => {
        if (resp.status === 200 && resp.statusText === "OK") {
          alert("Created successfully!");
          console.log(`Fire beverage save modal.`);
          this.setState({
            name: "",
            description: ""
          });
          this.props.updateStateWithNewBeverage(resp.data);
        } else {
          alert("Error encountered, please try again.");
          console.log(
            `Save beverage returned non-error status code: please debug`
          );
          if (resp.status === 500) {
            // Error: Request failed with status code 500
            console.log(`500 error`);
          }
          console.log(resp.status, resp.statusText);
        }
      });
    }
  };

  render() {
    const { name, description } = this.state;
    const { classes } = this.props;

    return (
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        <TableCell
          align="center"
          className={classNames(classes.name, classes.textField)}
        >
          <InputBase
            className={classNames("editable", classes.form)}
            placeholder="Name"
            onChange={e => this.fieldChangeHandler(e, "name")}
            margin="dense"
            value={name}
            onKeyUp={e => this.handleKeyup(e)}
          />
        </TableCell>
        <TableCell
          align="center"
          className={classNames(classes.textField, classes.description)}
        >
          <InputBase
            className={classNames("editable", classes.form)}
            placeholder="Description"
            onChange={e => this.fieldChangeHandler(e, "description")}
            margin="dense"
            value={description}
            onKeyUp={e => this.handleKeyup(e)}
          />
        </TableCell>
        <TableCell align="center">
          <Icon className="fas fa-arrow-right" />
        </TableCell>
        <TableCell align="center" />
        <TableCell align="center">
          <MuiThemeProvider theme={greenTheme}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.saveHandler}
              className={classes.saveButton}
              disableFocusRipple={true}
            >
              Save New!
            </Button>
          </MuiThemeProvider>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(NewBevRow);
