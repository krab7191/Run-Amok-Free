// @author Karsten Rabe

// Display all the beverage data in a sortable, searchable table with editable name, desc, and availability fields

// Boilerplate + utilities
import React, { Component } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import "./EditableDataTable.css";

// Import the material UI table comps
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

// Import table header and row comps
import BevTableHeader from "./Headers/BevsHeader";
import BevTableRow from "./Rows/BevsRows";
import UsersTableHeader from "./Headers/UsersHeader";
import UsersTableRow from "./Rows/UsersRows";

// Save button for beverage management
import SaveButton from "../SaveButton";
import NewBevRow from "./NewBevRow";

import AddUser from "../AddUser/AddUser";

class EditableDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Loading..."],
      // Data for a NEW beverage goes here
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
    this.state.data.forEach((n, i) => {
      if (n._id === _id) {
        let newState = [...this.state.data];
        newState[i][col] = value;
        newState[i].edited = true;
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
        this.setState(
          {
            data: newState
          },
          () => {
            console.log("State updated");
            this.props.type === "bevs"
              ? this.sendUpdateBeverage(n)
              : this.sendUpdateUser(n);
          }
        );
      }
    });
  };

  // After an api call to change the database fails, rollback the state so it's in sync
  // rollbackStateAfterAPIFail = (obj) => {
  //   const k = Object.keys(changes)[0];
  //   const v = Object.values(changes)[0];
  //   this.state.data.forEach((n, i) => {
  //     if (n._id === id) {
  //       let newState = [...this.state.allBevs];
  //       newState[i][k] = v;
  //       this.setState({
  //         data: newState
  //       });
  //     }
  //   });
  // };

  // Handle updating database when a beverage is changed
  sendUpdateBeverage = bevObj => {
    API.changeBeverage(bevObj)
      .then(resp => {
        if (resp.status === 200 && resp.statusText === "OK") {
          console.log(`All good. Fire save related modal to let user know.`);
          this.updateStateWithModifiedBeverage(
            resp.data._id,
            resp.data.dateUpdated
          );
        } else {
          console.log(
            `Update beverage returned non-error status code: please debug`
          );
          if (resp.status === 500) {
            // Error: Request failed with status code 500
            console.log(`500 error`);
          }
          console.log(resp.status, resp.statusText);
        }
      })
      .catch(err => {
        console.log(`Error updating beverage: ${err}`);
        if (err.Error === "Network Error") {
          console.log(
            `Internet disconnected, undo state changes and fire modal to let user know`
          );
          // this.rollbackStateAfterAPIFail(bevObj);
        } else {
          console.log(`Non network-related error. Please debug: ${err}`);
        }
      });
  };

  sendUpdateUser = userObj => {
    API.updateUserPermissions(userObj)
      .then(resp => {
        if (resp.status === 200 && resp.statusText === "OK") {
          console.log(`User permissions changed, fire modal`);
          console.log(resp.data);
        } else {
          console.log(
            `Change user permissions returned non-error status code: please debug`
          );
          if (resp.status === 500) {
            // Error: Request failed with status code 500
            console.log(`500 error`);
          }
          console.log(resp.status, resp.statusText);
        }
      })
      .catch(err => {
        console.log(`Error updating beverage: ${err}`);
        if (err.Error === "Network Error") {
          console.log(
            `Internet disconnected, undo state changes and fire modal to let user know`
          );
          // this.rollbackStateAfterAPIFail(userObj);
        } else {
          console.log(`Non network-related error. Please debug: ${err}`);
        }
      });
  };

  // Save handler for editing the beverages
  saveHandler = () => {
    this.state.data.forEach(bev => {
      if (bev.edited) {
        API.changeBeverage(bev)
          .then(res => {
            this.updateStateWithModifiedBeverage(
              res.data._id,
              res.data.dateUpdated
            );
          })
          .catch(err => console.log(`Error changing bev: ${err}`));
      }
    });
  };

  updateStateWithModifiedBeverage = (_id, dateMod) => {
    let newState = [...this.state.data];
    newState.forEach((bev, i) => {
      if (bev._id === _id) {
        newState[i].dateUpdated = dateMod;
      }
    });
    this.setState({
      data: newState
    });
  };

  render() {
    return (
      <>
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
                      handleSwitchToggle={this.handleSwitchToggle}
                      {...row}
                      userId={this.props.userId}
                    />
                  ))}
              {this.props.type === "bevs" && <NewBevRow saveBeverage={this.saveBeverage} />}
            </TableBody>
          </Table>
          {this.state.data.length === 0 && (
            <p className="text-center">No beverages! Try creating some.</p>
          )}
        </Paper>
        {this.props.type === "users" ? <AddUser /> : null}
        {this.props.type === "bevs" && this.state.data[0] !== "Loading..." && (
          <SaveButton saveHandler={this.saveHandler} />
        )}
      </>
    );
  }
}

export default EditableDataTable;
