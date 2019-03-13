// @author Karsten Rabe

// Display all the beverage data in a sortable, searchable table with editable name, desc, and availability fields

import React, { Component } from 'react';
import API from '../../utils/API';
import './EditableDataTable.css';

// Import the material UI table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';


class EditableDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBevs: ["Loading..."],
            newBev: {
                name: "",
                description: "",
                isAvailable: null
            },
            heads: ["Name", "Description", "Is Available?", "Date Created", "Last Updated"]
        };
    }

    componentWillMount() {
        this.getAllBeverages();
    }

    getAllBeverages = () => {
        API.getAllBeverages()
            .then(res => {
                console.log(`All beverages fetched.`);
                this.setState({
                    allBevs: res.data
                });
            })
            .catch(err => console.log(`Error getting all beverages: ${err}`));
    };

    // Convert mongoose datestamp to human friendly date
    makeDateReadable = jsDate => {
        const d = new Date(jsDate);
        const month = d.toLocaleString('en-us', { month: 'long' });
        const day = d.toLocaleString("en-us", { day: "numeric" });
        const year = d.toLocaleString("en-us", { year: "numeric" });
        return `${month} ${day}, ${year}`;
    }

    // Given the change event of input fields, update state based on ObjectId and column name
    handleFieldChange = (e, col, _id) => {
        const { value } = e.target;
        this.state.allBevs.forEach((bev, i) => {
            if (bev._id === _id) {
                let newState = [...this.state.allBevs];
                newState[i][col] = value;
                this.setState({
                    allBevs: newState
                });
            };
        });
    }

    render() {

        return (
            <Paper>
                <Table padding="checkbox">
                    <TableHead>
                        <TableRow>
                            {this.state.heads.map((h, i) => {
                                return i === 0 ? <TableCell key={i}>{h}</TableCell> : <TableCell key={i} align="center">{h}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allBevs[0] !== "Loading..." && this.state.allBevs.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    <form noValidate autoComplete="off">
                                        <InputBase
                                            className="beverage-name editable"
                                            value={row.name}
                                            onChange={e => this.handleFieldChange(e, 'name', row._id)}
                                            margin="dense"
                                        />
                                    </form>
                                </TableCell>
                                <TableCell align="left">
                                    <form noValidate autoComplete="off">
                                        <InputBase
                                            className="beverage-description editable"
                                            value={row.description}
                                            onChange={e => this.handleFieldChange(e, 'description', row._id)}
                                            margin="dense"
                                        />
                                    </form>
                                </TableCell>
                                {/* Cast boolean to string for display purposes */}
                                <TableCell align="center">{` ${row.isAvailable}`}</TableCell>
                                <TableCell align="center">{this.makeDateReadable(row.dateCreated)}</TableCell>
                                <TableCell align="center">{this.makeDateReadable(row.dateUpdated)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

};

export default EditableDataTable;