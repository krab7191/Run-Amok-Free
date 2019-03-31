import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';


class BevTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heads: [
                { id: 'name', numeric: false, disablePadding: true, label: 'Name' }, 
                { id: 'description', numeric: false, disablePadding: true, label: "Description" }, 
                { id: 'isAvail', numeric: false, disablePadding: false, label: "Is Available?" },
                { id: 'dateCreated', numeric: false, disablePadding: false, label: "Date Created" },
                { id: 'dateUpdated', numeric: false, disablePadding: false, label: "Last Updated" }]
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
                        return i === 0 ? 
                            <TableCell key={h.id}>
                                <Tooltip
                                    title="Sort"
                                    placement={h.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === h.id}
                                        direction={order}
                                        onClick={this.createSortHandler(h.id)}
                                    >
                                        {h.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell> : 
                            <TableCell key={h.id} align="center">
                                <Tooltip
                                    title="Sort"
                                    placement={h.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === h.id}
                                        direction={order}
                                        onClick={this.createSortHandler(h.id)}
                                    >
                                        {h.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>;
                    })}
                </TableRow>
            </TableHead>
        )
    }
}

BevTableHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default BevTableHeader;