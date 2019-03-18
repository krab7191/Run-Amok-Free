import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class UserTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heads: ["First", "Last", "Email", "Admin?", "Date Added"]
        };
    }
    render() {
        return (
            <TableHead>
                <TableRow>
                    {this.state.heads.map((h, i) => {
                        return i === this.state.heads.length-1 ? 
                            <TableCell key={i} align="right">{h}</TableCell> : 
                            <TableCell key={i} align="center">{h}</TableCell>;
                    })}
                </TableRow>
            </TableHead>
        )
    }
}

export default UserTableHeader;