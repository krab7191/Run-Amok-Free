import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import Switch from "../../Switch";

class BevTableRow extends React.Component {
  render() {
    const {
      _id,
      name,
      description,
      isAvailable,
      dateCreated,
      dateUpdated,
      handleFieldChange,
      handleSwitchToggle,
      readable
    } = this.props;

    return (
      <TableRow key={_id}>
        <TableCell component="th" scope="row">
          <form autoComplete="off">
            <InputBase
              className="beverage-name editable"
              value={name}
              onChange={e => handleFieldChange(e, "name", _id)}
              margin="dense"
            />
          </form>
        </TableCell>
        <TableCell align="left">
          <form autoComplete="off">
            <InputBase
              className="beverage-description editable"
              value={description}
              onChange={e => handleFieldChange(e, "description", _id)}
              margin="dense"
            />
          </form>
        </TableCell>
        <TableCell align="center">
          {/* Default MUI switch */}
          {/* <Switch
                        checked={isAvailable}
                        onChange={(e)=>handleSwitchToggle(e,_id)}
                        _id={_id}
                    /> */}
          <Switch
            isAvailable={isAvailable}
            handleToggle={handleSwitchToggle}
            _id={_id}
          />
        </TableCell>
        <TableCell align="center">{readable(dateCreated)}</TableCell>
        <TableCell align="center">{readable(dateUpdated)}</TableCell>
      </TableRow>
    );
  }
}

export default BevTableRow;
