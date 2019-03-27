// Boilerplate
import React, { Component } from "react";
import "./SaveButton.css";

// MUI Button
import Button from "@material-ui/core/Button";

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

class SaveButton extends Component {
  render() {
    return (
      <MuiThemeProvider theme={greenTheme}>
        <div className="save-button">
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={this.props.saveHandler}
          >
            Update
          </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SaveButton;
