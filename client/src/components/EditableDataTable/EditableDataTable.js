// @author Karsten Rabe

// Display all the beverage data in a sortable, searchable table with editable name, desc, and availability fields

// Boilerplate + utilities
import React, { Component } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import dateTime from "../../utils/dateTime";
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

// Toast notifications
import { toast } from "react-toastify";
import toastNotifier from "../../utils/toast";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EditableDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Loading..."],
      // Data for a NEW beverage goes here
      newData: {},
      isAvailable: null,
      isAdmin: null,
      order: 'asc',
      orderBy: 'firstName',
      selected: null
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

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy }, () => console.log(this.state));
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
    if (selected === id) {
      this.setState({ selected: null });
    } 
    else {
      this.setState({ selected: id });
    }
  };

  isSelected = id => this.state.selected === id;

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
  handleSwitchToggle = (e, _id, page) => {
    const { checked } = e.target;
    let verify = true;
    if (checked === false && page === "users") {
      verify = window.confirm(
        "You're about to revoke admin privileges, are you sure?"
      );
    }
    verify === true &&
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


  deleteBeverage = bevId => {
    API.deleteBeverage(bevId)
    .then((resp) => {
      if (resp.status === 200 && resp.statusText === "OK") {
        console.log(`All good. Deleted ${resp.data} beverage!`);
        this.getAllBeverages();
      }
      else {
        console.log(
          `Delete beverage returned non-error status code: please debug`
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
  }
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
            // function notify (text, type, duration, toast)
            toastNotifier.notify(
              `${bev.name} updated!`,
              "success",
              1500,
              toast
            );
            this.updateStateWithModifiedBeverage(
              res.data._id,
              res.data.dateUpdated
            );
          })
          .catch(err => {
            toastNotifier.notify(
              `Failed to update ${bev.name}`,
              "error",
              2000,
              toast
            );
            console.log(`Error changing bev: ${err}`);
          });
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

  updateStateWithNewBeverage = obj => {
    delete obj.notes;
    delete obj.__v;
    const newState = [...this.state.data];
    newState.push(obj);
    this.setState({
      data: newState
    });
  };

  render() {
    const { data, order, orderBy } = this.state;

    return (
      <>
        <Paper className="overflow-table">
          <Table>
            {this.props.type === "bevs" ? (
              <BevTableHeader 
                deleteBev={this.deleteBeverage}
                isSelected={this.state.selected}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
            ) : (
              <UsersTableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
            )}
            <TableBody>
              {this.props.type === "bevs" ? 
                this.state.data[0] !== "Loading..." &&
                  stableSort(data, getSorting(order, orderBy))
                    .map(row => {
                      const isSelected = this.isSelected(row._id);
                      return (<BevTableRow
                        key={row._id}
                        handleClick={this.handleClick}
                        handleFieldChange={this.handleFieldChange}
                        handleSwitchToggle={this.handleSwitchToggle}
                        isSelected={isSelected}
                        readable={dateTime.makeDateReadable}
                        {...row}
                      />
                    );
                  })
                : this.state.data[0] !== "Loading..." &&
                  stableSort(data, getSorting(order, orderBy)).map(row => {
                    // const isSelected = this.isSelected(row.id);
                    return (
                      <UsersTableRow
                        key={row._id}
                        readable={dateTime.makeDateReadable}
                        handleSwitchToggle={this.handleSwitchToggle}
                        {...row}
                        userId={this.props.userId}
                        // selected={isSelected}
                        // onClick={event => this.handleClick(event, row.id)}
                      />
                    );
                  })}
              {this.props.type === "bevs" && (
                <NewBevRow
                  updateStateWithNewBeverage={this.updateStateWithNewBeverage}
                />
              )}
            </TableBody>
          </Table>
          {this.state.data.length === 0 && (
            <p className="text-center">No beverages! Try creating some.</p>
          )}
        </Paper>
        {this.props.type === "users" ? <Paper><AddUser /></Paper> : null}
        {this.props.type === "bevs" && this.state.data[0] !== "Loading..." && (
            <SaveButton saveHandler={this.saveHandler} />
        )}
      </>
    );
  }
}

export default EditableDataTable;
