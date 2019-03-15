import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Moment from 'react-moment';
import AUTH from '../../utils/AUTH';

let id = 0;
function createData(fullName, email, admin, numNotes, date) {
    id += 1;
    return { id, fullName, email, admin, numNotes, date };
  }

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        const headerRows = [
            { id: 'name', numeric: false, disablePadding: true, label: 'Full Name' },
            { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
            { id: 'isAdmin', numeric: false, disablePadding: false, label: 'Admin' },
            { id: 'numNotes', numeric: true, disablePadding: false, label: 'Notes Left' },
            { id: 'date', numeric: true, disablePadding: false, label: 'Date Joined' },
        ];
        return (
            <TableHead>
                <TableRow>
                <CustomTableCell padding="checkbox">
                    <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    onChange={onSelectAllClick}
                    />
                </CustomTableCell>
                {headerRows.map(
                    row => (
                    <CustomTableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'center'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <Tooltip
                        title="Sort"
                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                        >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={this.createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                        </Tooltip>
                    </CustomTableCell>
                    ),
                    this,
                )}
                </TableRow>
            </TableHead>
        )
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;
  
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Users
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
  

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "blue",
        color: "black",
        fontSize: "1.0rem"
    },
    body: {
        fontSize: 14,
        fontWeight: "500"
    },
}))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
    }},
});

class CustomizedTable extends React.Component {

  state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        users: [],
        page: 0,
  }

  componentWillMount () {
    AUTH.getAllUsers().then((res) => {
        console.log(res.data);
        const userRows = this.makeRows(res.data);
        this.setState({
            users: userRows
        })
    }).catch(err=>console.log(err))
  }
  
  makeRows = (data) => {
    let rows = [];
    data.forEach(el => {
        rows.push(createData(
            el.firstName+" "+el.lastName, 
            el.email, 
            el.isAdmin, 
            el.notes.length, 
            el.dateAdded)
        );
        console.log(rows);
    });
    return rows;
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.users.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render () {

    const { classes } = this.props;
    const { users, order, orderBy, selected } = this.state;

    return (
        <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead 
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={users.length}
                    />
                    <TableBody>
                        {stableSort(users, getSorting(order, orderBy))
                            .map(n => {
                            const isSelected = this.isSelected(n.id);
                            return (
                                <TableRow
                                hover
                                onClick={event => this.handleClick(event, n.id)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={n.id}
                                selected={isSelected}
                                >
                                <CustomTableCell padding="checkbox">
                                    <Checkbox checked={isSelected} />
                                </CustomTableCell>
                                <CustomTableCell align="center" component="th" scope="row" padding="none">
                                    {n.fullName}
                                </CustomTableCell>
                                <CustomTableCell align="center">{n.email}</CustomTableCell>
                                <CustomTableCell align="center">{n.admin===true ? "Yes" : "No"}</CustomTableCell>
                                <CustomTableCell align="right">{n.numNotes}</CustomTableCell>
                                <CustomTableCell align="right"><Moment date={n.date} format="MMMM Do YYYY, h:mm a" /></CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);