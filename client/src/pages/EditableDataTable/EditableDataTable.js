import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import update from 'immutability-helper';
import './EditableDataTable.css';
import CreateButton from '../../components/CreateButton';

class EditableDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBevs: [],
            newBevs: {
                "name": "",
                "description": "",
                isAvailable: false,
                comment: "",
                timesTasted: "",
                date:""
                
            }
        };
        this.renderEditable = this.renderEditable.bind(this);
    }
    // Don't update the Admin comp if the newBev state object is updated
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.allBevs !== nextState.allBevs) {
            return true;
        }
        return true;
        // return false;
    }
    componentDidMount() {
        this.getBevData();
    }
    submitData = () => {
        if (this.checkAllFields()) {
            this.notify("Saving new bev!", "info", 3000);
            API.bev(this.state.newBev)
                .then(res => {
                    if (res.data.message === "Saved successfully") {
                        this.notify("Bev saved!", "success", 3000, this.addNewBevToState, false, res.data.id);
                    }
                    else {
                        console.log("Something wrong...");
                    }
                }).catch(err => {
                    console.log(`Error saving . . . ${err}`);
                    this.notify(`Error saving: ${err}`, "error", 5000);
                });
        }
        else {
            this.notify("Please fill out all the fields!", 'warning', 4000);
        }
    }

    addNewBevToState = id => {
        let newBev = this.state.newBev;
        newBev._id = id;
        this.setState({
            allBevs: update(this.state.allBevs, {$push: [newBev] } )
        }, () => {
            console.log("State updated");
        });
    }

    checkAllFields = () => {
        const v = Object.values(this.state.newBev);
        let good = true;
        v.forEach(b => {
            if (b.length === 0) {
                good = false;
                return;
            }
        });
        return good;
    }

    notify = (message, type, duration, openCallback, closeCallback, data) => toast(
        message,
        {
            type: type,
            autoClose: duration ? duration : false,
            onOpen: () => {
                openCallback && openCallback(data);
            },
            onClose: () => {
                closeCallback && closeCallback(data);
            }
        });
    getBevData = () => {
        API.getBevData()
            .then(res => {
                this.setState({
                  // added .drinks because of initial seed data in getController
                    allBevs: res.data.drinks
                  });
                  console.log(res.data)
              })
            .catch(err => console.log(err));
    };
    updateEntry = dataObj => {
        this.notify("Updating remote...", "info", 3000);
        let { _id, column, val, i } = dataObj;
        let data = {};
        if (column === 'isAvailable' && val === 'true') {
            data[column] = true;
        }
        else if (column === 'isAvailable' && val === 'false') {
            data[column] = false;
        }
        else {
            data[column] = val;
        }
        API.edits(_id, data)
            .then(res => {
                if (res.data.message === 'Updated successfully') {
                    this.updateEditedDateFrontend(res.data.resp.edited, i);
                }
                else {
                    console.log("Something went wrong...");
                }
            }).catch(err => {
                console.log(`Error saving . . . ${err}`);
                this.notify(`Error updating: ${err}`, "error", 5000);
            });
    }

    updateEditedDateFrontend = (date, index) => {
        this.setState({
            allBevs: update(this.state.allBevs, { [index]: { edited: { $set: date } } })
        }, () => {
            this.notify("Database updated!", "success", 3000);
        });
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fbfbfb" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    // Prevent updating unchanged cells
                    if (e.target.innerHTML === cellInfo.original[cellInfo.column.id]) {
                        return;
                    }
                    const { innerHTML } = e.target;
                    this.notify("Saving changes...", 'info', 3000, this.updateEntry, this.saveState, { _id: cellInfo.original._id, column: cellInfo.column.id, val: innerHTML, i: cellInfo.index });
                }}
            >
                {cellInfo.value}
            </div>
        );
    }

    editableBooleans = cellInfo => {
        const isAvailable = cellInfo.original.isAvailable.toString();
        return (
            <select
                onChange={e => {
                    const { value } = e.target;
                    this.notify("Saving changes...", 'info', 3000, this.updateEntry, this.saveState, { _id: cellInfo.original._id, column: cellInfo.column.id, val: value, i: cellInfo.index });
                }}
                style={{ width: "100%" }}
                value={isAvailable === 'true' ? 'true' : 'false'}
            >
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select >
        );
    }

    saveState = dataObj => {
        let { column, val, i } = dataObj;
        this.setState({
            allBevs: update(this.state.allBevs, { [i]: { [column]: { $set: val } } })
        }, () => {
            this.notify("State saved!", 'success', 3000);
        });
    }

    makeDateReadable = jsDate => {
        const d = new Date(jsDate);
        const month = d.toLocaleString('en-us', { month: 'long' });
        const day = d.toLocaleString("en-us", { day: "numeric" });
        const year = d.toLocaleString("en-us", { year: "numeric" });
        return `${month} ${day}, ${year}`;
    }

    betterStringFilter = (filter, row) => {
        return row[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) >= 0 && row[filter.id];
    }

    setNewBevState = filterObj => {
        if (filterObj) {
            const newBev = { ...this.state.newBev };
            newBev[filterObj.id] = filterObj.value;
            this.setState({
                newBev
            });
        }
    }

    render() {
      console.log("All Bev Data", this.state.allBevs.drinks)

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            width: 250,
            Cell: this.renderEditable,
            Filter: ({ filter, onChange }) =>
                <div
                    className="rt-th"
                    role="columnheader"
                    tabIndex="-1"
                    style={{ flex: '100 0 auto', width: '100%' }}
                >
                    <input
                        type="text"
                        value={filter ? filter.value : ""}
                        style={{ width: '100%' }}
                        onBlur={e => { this.setNewBevState(filter) }}
                        onChange={event => { onChange(event.target.value) }}
                    />
                </div>
        }, {
            Header: 'Description',
            accessor: 'description',
            Cell: this.renderEditable,
            width: 500,
           
            Filter: ({ filter, onChange }) =>
                <div
                    className="rt-th"
                    role="columnheader"
                    tabIndex="-1"
                    style={{ flex: '100 0 auto', width: '100%' }}
                >
                    <input
                        type="text"
                        value={filter ? filter.value : ""}
                        style={{ width: '100%' }}
                        onBlur={e => { this.setNewBevState(filter) }}
                        onChange={event => { onChange(event.target.value) }}
                    />
                </div>
        }, {
            Header: 'Available?',
            accessor: 'isAvailable',
            width: 100,
            Cell: this.editableBooleans,
            filterMethod: (filter, row) => {
                if (filter.value === "all") {
                    return true;
                }
                if (filter.value === 'true') {
                    return row[filter.id] === true;
                }
                if (filter.value === 'false') {
                    let bool = row[filter.id];
                    if (bool === 'false') {
                        bool = false;
                    }
                    if (bool === 'true') {
                        bool = true;
                    }
                    return bool === false;
                }
            },
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => { onChange(event.target.value) }}
                    onBlur={e => { this.setNewBevState(filter) }}
                    style={{ width: "98%" }}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>,
            maxWidth: 80
        }, {
            Header: 'Times Tasted',
            accessor: 'timesTasted',
            Cell: this.renderEditable,
            maxWidth: 100,
            Filter: ({ filter, onChange }) =>
                <div
                    className="rt-th"
                    role="columnheader"
                    tabIndex="-1"
                    style={{ flex: '100 0 auto', width: '100%', maxWidth: '80px' }}
                >
                    <input
                        type="text"
                        value={filter ? filter.value : ""}
                        style={{ width: '100%' }}
                        onBlur={e => { this.setNewBevState(filter) }}
                        onChange={event => { onChange(event.target.value) }}
                    />
                </div>
        }, {
          Header: 'Date added',
          id: 'date',
          accessor: bevObj => this.makeDateReadable(bevObj.date)
      },]

        return (
            <Fragment>
                <ToastContainer />
                <CreateButton submitData={this.submitData} />
                <ReactTable
                    data={this.state.allBevs}
                    columns={columns}
                    filterable
                    defaultPageSize={10}
                    defaultFilterMethod={(filter, row) => this.betterStringFilter(filter, row)}
                    style={{
                        height: "620px" // Height of the screen
                    }}
                    noDataText="No data . . ."
                />
            </Fragment>
        );
    }

};

export default EditableDataTable;