import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class BevTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heads: ["Name", "Description", "Is Available?", "Date Created", "Last Updated"]
        };
    }
    render() {
        return (
            <TableHead>
                <TableRow>
                    {this.state.heads.map((h, i) => {
                        return i === 0 ? <TableCell key={i}>{h}</TableCell> : <TableCell key={i} align="center">{h}</TableCell>;
                    })}
                </TableRow>
            </TableHead>
        )
    }
}

export default BevTableHeader;