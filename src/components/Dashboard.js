import React from "react";
import "./dashboard.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    margin: "auto",
  },
  tableContainer: {
    marginTop: "1rem",
    display: "flex",
  },
  tableHead: {
    backgroundColor: "gray",
  },
  tableButton: {
    float: "right",
  },
  tableBody: {
    fontSize: "1.2em",
  },
});

const Dashboard = (props) => {
  const {formData, deleteItem, setComponent, setMode, setIndex, setFormObject } = props;
  const classes = useStyles();

  const handleClick = () => {
    setComponent("Form");
    setMode("create");
    setFormObject({});
  };

  const deleteData = (index) => {
    deleteItem(index);
  };

  const editData = (val, index) => {
    setMode("edit");
    setIndex(index);
    setFormObject(val);
    setComponent("Form");
  };

  const today = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return (
    <>
      <div className="container">
        <form class="form">
          <button type="button" onClick={handleClick}>
            Create New Form
          </button>
        </form>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.tableHead}>
                  Datapool Name
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Upload Date
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Samples
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  owner
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Marker
                </StyledTableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {formData &&
                formData.map((val, index) => (
                  <StyledTableRow key={val.index}>
                    <StyledTableCell
                      className={classes.tableBody}
                      component="th"
                      scope="row"
                    >
                      {val.name}
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableBody}
                      component="th"
                      scope="row"
                    >
                      {today}/{month}/{year}
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableBody}
                      component="th"
                      scope="row"
                    >
                      {val.samples}
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableBody}
                      component="th"
                      scope="row"
                    >
                      {val.owner}
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableBody}
                      component="th"
                      scope="row"
                    >
                      {val.marker}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell align="right">
                      <div style={{ display: "flex" }}>
                        <button onClick={() => editData(val, index)}>
                          <EditIcon className="editIcon" />
                        </button>
                        <button onClick={() => deleteData(index)}>
                          <DeleteOutlineIcon className="deleteIcon" />
                        </button>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Dashboard;
