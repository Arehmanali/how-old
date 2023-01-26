import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    rowsPerPage,
  } = props;
  const page = tableData && Math.ceil(tableData.length / 10);

  const dateFromISO = (s) => {
    var b = s.split(/\D+/);
    return `${b[2]}-${b[1]}-${b[0]}`;
  };

  const timeFromISO = (s) => {
    var b = s.split(/\D+/);
    return `${b[3]}:${b[4]}:${b[5]}`;
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.slice(0, rowsPerPage).map((prop, key) => {
            return (
              <TableRow key={key}>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.id}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.gender}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.age}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.feeling}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {dateFromISO(prop.created_at)}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {timeFromISO(prop.created_at)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={0}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={{}}
          onChangeRowsPerPage={{}}
        />
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default withStyles(tableStyle)(CustomTable);
