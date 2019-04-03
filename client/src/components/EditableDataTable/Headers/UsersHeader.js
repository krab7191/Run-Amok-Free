import React from "react";
import PropTypes from 'prop-types';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from "@material-ui/core";

const CustomTableCell = withStyles( (theme) => ({
  head: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    '&::hover':{
      color: 'black'
    }
  },
}))(TableCell)

const CustomTableSortLabel = withStyles( (theme) => ({
  root: {
    marginLeft: '25px',
    fontSize: '1.1rem',
  },
}))(TableSortLabel)

class UserTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heads: [
        { id: 'firstName', numeric: false, disablePadding: true, label: 'First' }, 
        { id: 'lastName', numeric: false, disablePadding: true, label: "Last" }, 
        { id: 'email', numeric: false, disablePadding: false, label: "Email" },
        { id: 'username', numeric: false, disablePadding: false, label: "Username" },
        { id: 'isAdmin', numeric: false, disablePadding: false, label: "Admin?" },
        { id: 'createdOn', numeric: false, disablePadding: false, label: "Date Added" }]
    };
  }

  createSortHandler = property => event => {
    console.log(property);
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {this.state.heads.map((h, i) => {
            return i === this.state.heads.length - 1 ? (
              <CustomTableCell key={h.id} align="right" sortDirection={orderBy === h.id ? order : false}>
                <Tooltip
                    title="Sort"
                    placement={h.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                  <CustomTableSortLabel
                      active={orderBy === h.id}
                      direction={order}
                      onClick={this.createSortHandler(h.id)}
                  >
                    {h.label}
                  </CustomTableSortLabel>
                </Tooltip>
              </CustomTableCell>
            ) : (
              <CustomTableCell key={h.id} align="center">
                <Tooltip
                    title="Sort"
                    placement={h.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                  <CustomTableSortLabel
                      active={orderBy === h.id}
                      direction={order}
                      onClick={this.createSortHandler(h.id)}
                  >
                    {h.label}
                  </CustomTableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

UserTableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default UserTableHeader;
