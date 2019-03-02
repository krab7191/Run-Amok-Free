import React, { Component } from 'react';
import './CreateButton.css';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: green,
  }
});

class CreateButton extends Component {

  // Only update with initial props
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" id="create-button" onClick={this.props.submitData}>
          Create!
        </Button>
      </MuiThemeProvider >
    )
  }
};

export default CreateButton;