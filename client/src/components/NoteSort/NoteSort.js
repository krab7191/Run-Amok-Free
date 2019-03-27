import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  },
  select: {
    cursor: "pointer"
  }
});

class NativeSelects extends React.Component {
  state = {
    bev: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      this.props.sort(this.state.bev);
    });
  };

  render() {
    const { classes, bevNames } = this.props;
    return (
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-bevs">Filter</InputLabel>
        <Select
          native
          value={this.state.bev}
          onChange={this.handleChange("bev")}
          input={<FilledInput name="bevs" id="filled-bevs" />}
        >
          {!this.state.bev ? <option value={""} /> : null}
          <option value={"All"}>All</option>
          {bevNames.map((n, i) => (
            <option key={i} value={n}>
              {n}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NativeSelects);
