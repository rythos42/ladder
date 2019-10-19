import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

class SortableTableHead extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.tableHeaders.map(tableHeader => (
            <TableCell
              key={tableHeader.id}
              sortDirection={
                this.props.orderBy === tableHeader.id ? this.props.order : false
              }
              className={tableHeader.className}
            >
              <TableSortLabel
                active={this.props.orderBy === tableHeader.id}
                direction={this.props.order}
                onClick={() => this.props.onRequestSort(tableHeader.id)}
              >
                {tableHeader.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default SortableTableHead;
