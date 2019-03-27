// @author Karsten Rabe

// Boilerplate + utilities
import React, { Component } from "react";
// import API from "../../../utils/API";
import "./NewBevRow.css";

// Import the MAT UI table comps
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button/Button";

class NewBevRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNameChange = e => {
    console.log("Changing the name");
  };
  handleDescChange = e => {
    console.log("Changing the desc");
  };
  saveHandler = () => {
    console.log("I'm the save handler!!");
  };

  render() {
    return (
      <TableRow>
        <TableCell align="left">
          <form autoComplete="off">
            <InputBase
              className="editable"
              placeholder="Name"
              onChange={e => this.handleNameChange(e)}
              margin="dense"
            />
          </form>
        </TableCell>
        <TableCell align="center">
          <form autoComplete="off">
            <InputBase
              className="editable"
              placeholder="Description"
              onChange={e => this.handleDescChange(e)}
              margin="dense"
            />
          </form>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="primary"
            saveHandler={this.saveHandler}
          >
            Save new
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default NewBevRow;
