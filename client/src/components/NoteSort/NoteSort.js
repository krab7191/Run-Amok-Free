import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  filterHeader: {
    display: 'flex',
    justifyContent: "center",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  select: {
    cursor: "pointer"
  }
});

class NativeSelects extends React.Component {
  state = {
    sortData: "All",
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      this.props.sort(this.state.sortData);
    });
  };

  render() {
    const { classes, changeType, sortType, sortData } = this.props;
    return (
      <div className={classes.filterHeader}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-sortType">Filter By</InputLabel>
          <Select
            native
            value={sortType}
            onChange={changeType}
            input={<FilledInput name="sortType" id="filled-sortType" />}
          >
            <option value={"Date Left"}>Date Left</option>
            <option value={"Mead Name"}>Mead Name</option>
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-bevs">Filter</InputLabel>
          <Select
            native
            value={this.state.sortData}
            onChange={this.handleChange("sortData")}
            input={<FilledInput name="sortData" id="filled-sortData" />}
          >
            <option value={"All"}>All</option>
            {sortData.map((n, i) => (
              <option key={i} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NativeSelects);
