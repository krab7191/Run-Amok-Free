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
            heads: ["Name", "Description", "Is Available?", "Date Created", "Last updated"]
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

    makeDateReadable = jsDate => {
        const d = new Date(jsDate);
        const month = d.toLocaleString('en-us', { month: 'long' });
        const day = d.toLocaleString("en-us", { day: "numeric" });
        const year = d.toLocaleString("en-us", { year: "numeric" });
        return `${month} ${day}, ${year}`;
    }


    render() {

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.state.heads.map((h, i) => {
                                return i === 0 ? <TableCell key={i}>{h}</TableCell> : <TableCell key={i} align="right">{h}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.allBevs[0] !== "Loading..." && this.state.allBevs.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{"" + row.isAvailable}</TableCell>
                                <TableCell align="right">{row.dateCreated}</TableCell>
                                <TableCell align="right">{row.dateUpdated}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

};

export default EditableDataTable;