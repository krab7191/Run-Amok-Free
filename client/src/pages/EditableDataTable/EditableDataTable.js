import React, { Component } from 'react';
import API from '../../utils/API';
import './EditableDataTable.css';

// Import the material UI table
import Table from '@material-ui/core/Table';

class EditableDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBevs: [],
            newBev: {
                name: "",
                description: "",
                isAvailable: null,
                date: ""
            }
        };
    }

    componentWillMount() {
        this.getAllBeverages();
    }

    getAllBeverages = () => {
        API.getAllBeverages()
            .then(res => {
                console.log(`All beverages fetched.`)
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
        console.log("All Bev Data", this.state.allBevs)

        return (
            <>

            </>
        );
    }

};

export default EditableDataTable;