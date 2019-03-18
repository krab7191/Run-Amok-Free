import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';

class UserTableRow extends React.Component {
    
    render() {
        const { _id, 
                firstName, 
                lastName,
                email,
                isAdmin, 
                createdOn,
                // handleFieldChange,
                handleSwitchToggle,
                readable } = this.props;

        return (
            <TableRow key={_id}>
                <TableCell align="center" component="th" scope="row" padding="none">
                                    {firstName}
                </TableCell>
                <TableCell align="center" component="th" scope="row" padding="none">
                                    {lastName}
                </TableCell>
                <TableCell align="center">{email}</TableCell>
                <TableCell align="center">
                    <Switch
                            isadmin={isAdmin.toString()}
                            onChange={(e)=>handleSwitchToggle(e,_id)}
                            _id={_id}
                        />
                        {/* {isAdmin===true ? "Yes" : "No"} */}
                </TableCell>
                <TableCell align="right">{readable(createdOn)}</TableCell>
            </TableRow>
        )
    }
}

export default UserTableRow;