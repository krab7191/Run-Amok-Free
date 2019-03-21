// @author Karsten Rabe

// Display all the beverage data in a sortable, searchable table with editable name, desc, and availability fields

import React, { Component } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import "./EditableDataTable.css";

// Import the material UI table stuff
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import BevTableHeader from "./Headers/BevsHeader";
import BevTableRow from "./Rows/BevsRows";
import UsersTableHeader from "./Headers/UsersHeader";
import UsersTableRow from "./Rows/UsersRows";
import Paper from "@material-ui/core/Paper";

class EditableDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Loading..."],
      newData: {},
      isAvailable: null,
      isAdmin: null
    };
  }

  componentWillMount() {
    this.props.type === "bevs" ? this.getAllBeverages() : this.getAllUsers();
  }

  getAllBeverages = () => {
    API.getAllBeverages()
      .then(res => {
        console.log(`All beverages fetched.`);
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.log(`Error getting all beverages: ${err}`));
  };

  getAllUsers = () => {
    AUTH.getAllUsers()
      .then(res => {
        console.log(`All users fetched.`);
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.log(`Error getting all users: ${err}`));
  };

  // Convert mongoose datestamp to human friendly date
  makeDateReadable = jsDate => {
    const d = new Date(jsDate);
    const month = d.toLocaleString("en-us", { month: "long" });
    const day = d.toLocaleString("en-us", { day: "numeric" });
    const year = d.toLocaleString("en-us", { year: "numeric" });
    return `${month} ${day}, ${year}`;
  };

  // Given the change event of input fields, update state based on ObjectId and column name
  handleFieldChange = (e, col, _id) => {
    const { value } = e.target;
    console.log(value);
    this.state.data.forEach((n, i) => {
      if (n._id === _id) {
        let newState = [...this.state.data];
        newState[i][col] = value;
        this.setState({
          data: newState
        });
      }
    });
  };

  // Search state for the event target id, set isAvalable value equal to the new switch value
  handleSwitchToggle = (e, _id) => {
    const { checked } = e.target;
    this.state.data.forEach((n, i) => {
      if (n._id === _id) {
        let newState = [...this.state.data];
        this.props.type === "bevs"
          ? (newState[i].isAvailable = checked)
          : (newState[i].isAdmin = checked);
        this.setState({
          data: newState
        });
        this.sendUpdateBeverage(_id, { isAvailable: checked });
      }
    });
  };

  // After an api call to change the database fails, rollback the state so it's in sync
  // !! ** ASSUME changes is an object which contains one beverage property / value pair
  rollbackStateAfterAPIFail = (id, changes) => {
    const k = Object.keys(changes)[0];
    const v = Object.values(changes)[0];
    this.state.data.forEach((n, i) => {
      if (n._id === id) {
        let newState = [...this.state.allBevs];
        newState[i][k] = v;
        this.setState({
          data: newState
        });
      }
    });
  };

  // Handle updating database when a beverage is changed
  sendUpdateBeverage = (id, changes) => {
    API.changeBeverage(id, changes)
      .then(resp => {
        if (resp.status === 200 && resp.statusText === "OK") {
          console.log(`All good. Fire save related modal to let user know.`);
        } else {
          console.log(
            `Update beverage returned non-error status code: please debug`
          );
          console.log(resp.status, resp.statusText);
        }
      })
      .catch(err => {
        console.log(`Error updating beverage: ${err}`);
        if (err.Error === "Network Error") {
          console.log(
            `Internet disconnected, undo state changes and fire modal to let user know`
          );
          this.rollbackStateAfterAPIFail(id, changes);
        } else {
          console.log(`Non network-related error. Please debug: ${err}`);
          // Error: Request failed with status code 500
        }
      });
  };

  render() {
    console.log(this.state.data);
    return (
      <Paper className="overflow-table">
        <Table>
          {this.props.type === "bevs" ? (
            <BevTableHeader />
          ) : (
            <UsersTableHeader />
          )}
          <TableBody>
            {this.props.type === "bevs"
              ? this.state.data[0] !== "Loading..." &&
                this.state.data.map(row => (
                  <BevTableRow
                    key={row._id}
                    handleFieldChange={this.handleFieldChange}
                    handleSwitchToggle={this.handleSwitchToggle}
                    readable={this.makeDateReadable}
                    {...row}
                  />
                ))
              : this.state.data[0] !== "Loading..." &&
                this.state.data.map(row => (
                  <UsersTableRow
                    key={row._id}
                    readable={this.makeDateReadable}
                    // handleFieldChange={this.handleFieldChange}
                    handleSwitchToggle={this.handleSwitchToggle}
                    {...row}
                  />
                ))}
          </TableBody>
        </Table>
        {this.state.data.length === 0 && (
          <p className="text-center">No beverages! Try creating some.</p>
        )}
      </Paper>
    );
  }
}

export default EditableDataTable;
