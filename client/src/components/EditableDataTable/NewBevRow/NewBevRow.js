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

// Material UI theming
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

class NewBevRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  fieldChangeHandler = (e, which) => {
    this.setState({
      [which]: e.target.value
    });
  };
  saveHandler = () => {
    console.log(`Going to save new bev! `, this.state);
  };

  render() {
    const { name, description } = this.state;

    return (
      <TableRow>
        <TableCell align="left">
          <form autoComplete="off">
            <InputBase
              className="editable"
              placeholder="Name"
              onChange={e => this.fieldChangeHandler(e, "name")}
              margin="dense"
              value={name}
            />
          </form>
        </TableCell>
        <TableCell align="center">
          <form autoComplete="off">
            <InputBase
              className="editable"
              placeholder="Description"
              onChange={e => this.fieldChangeHandler(e, "description")}
              margin="dense"
              value={description}
            />
          </form>
        </TableCell>
        <TableCell align="right">
          <MuiThemeProvider theme={greenTheme}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.saveHandler}
            >
              Save New!
            </Button>
          </MuiThemeProvider>
        </TableCell>
      </TableRow>
    );
  }
}

export default NewBevRow;
