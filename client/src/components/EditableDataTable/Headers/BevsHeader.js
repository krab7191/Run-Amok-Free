import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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
    marginLeft: '5px',
    fontSize: '1.1rem',
  },
}))(TableSortLabel)

class BevTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heads: [
        { id: "name", numeric: false, disablePadding: true, label: "Name" },
        {
          id: "description",
          numeric: false,
          disablePadding: true,
          label: "Description"
        },
        {
          id: "isAvailable",
          numeric: false,
          disablePadding: false,
          label: "Is Available?"
        },
        {
          id: "dateCreated",
          numeric: false,
          disablePadding: false,
          label: "Date Created"
        },
        {
          id: "dateUpdated",
          numeric: false,
          disablePadding: false,
          label: "Last Updated"
        }
      ]
    };
  }

  createSortHandler = property => event => {
    console.log(property);
    this.props.onRequestSort(event, property);
  };

  render() {
    const { deleteBev, order, orderBy, isSelected } = this.props;
    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            {isSelected && (
              <Tooltip title="Delete">
                <IconButton
                  aria-label="Delete"
                  onClick={() => deleteBev(isSelected)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </CustomTableCell>
          {this.state.heads.map((h, i) => {
            return i === 0 ? (
              <CustomTableCell key={h.id}>
                <Tooltip
                  title="Sort"
                  placement={h.numeric ? "bottom-end" : "bottom-start"}
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
                  placement={h.numeric ? "bottom-end" : "bottom-start"}
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

BevTableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default BevTableHeader;
