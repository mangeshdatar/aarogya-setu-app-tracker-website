import React, { useState , useEffect}  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUsers } from '../../services/getUsers';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, appAvailability, bluetoothStatus, locationStatus, contactNo, employeeId) {
  return { name, appAvailability, bluetoothStatus, locationStatus, contactNo ,employeeId};
}





const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default  function EmployeeTable() {
  const classes = useStyles();
  

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setUserData(await getUsers());
    };
    getData();

  }, [setUserData]);
  
  var rows = [];
  if (userData.length > 1) {
    userData.forEach((user) => {
     
         rows.push(createData(user.name, user.appAvailability,user.bluetoothStatus, user.locationStatus, user.contactNo, user.employeeId))
    })
  }
  console.log("rows",rows);
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Employee Id</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="center">Aarogya Setu Availability</StyledTableCell>
            <StyledTableCell align="center">Bluetooth Status</StyledTableCell>
            <StyledTableCell align="center">Location Status</StyledTableCell>
            <StyledTableCell align="left">Contact Number</StyledTableCell>
            <StyledTableCell align="left">Last Update</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                {row.employeeId}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.appAvailability ? "Installed" : "NA"}</StyledTableCell>
              <StyledTableCell align="left">{row.bluetoothStatus ? "ON" : "OFF"}</StyledTableCell>
              <StyledTableCell align="left">{row.locationStatus ? "ON": "OFF"}</StyledTableCell>
              <StyledTableCell align="left">{row.contactNo}</StyledTableCell>
              <StyledTableCell align="left">Friday 20 May</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}