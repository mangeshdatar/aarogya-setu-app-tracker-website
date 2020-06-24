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
import ReactTimeAgo from 'react-time-ago';


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

function createData(id, name, appAvailability, bluetoothStatus, locationStatus, contactNo, employeeId ,lastSeen) {
  return { id, name, appAvailability, bluetoothStatus, locationStatus, contactNo ,employeeId,lastSeen};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },

  noRecord: {
    minWidth: 700,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default  function EmployeeTable(value) {
  const classes = useStyles();
  let filterdUserData =[];
  let isEmpty = false
  
  const [userData, setUserData] = useState([]);
  if (value.refreshData === false) {
    getUsers();
  }
  useEffect(() => {
    const getData = async () => { 
      setUserData(await getUsers());
    };
    getData();

  }, []);

    
    if(value.empRes.length> 0) {
      userData.forEach(user =>{
        const empName = user.name.toLowerCase();
        if( value.empRes === empName.substr(0, value.empRes.length)) {
            filterdUserData.push(user)
        } else {
          isEmpty = true
        }
    })
    } else {
      filterdUserData = userData;
    }
  const pushDataToRow = user => {
    rows.push(createData(user.id, user.name, user.appAvailability,user.bluetoothStatus, user.locationStatus, user.contactNo, user.employeeId, user.lastSeen))
  }
  
  var rows = [];
  
  if (filterdUserData.length >= 1) {
    filterdUserData.forEach((user) => {
      if (value.activeTab === 'allEmp') {
        pushDataToRow(user);
       } else if(value.activeTab === 'activeEmp' && user.appAvailability) {
        pushDataToRow(user);
     } else if (value.activeTab === 'inActiveEmp' && !user.appAvailability) {
      pushDataToRow(user);
   }
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Sr No.</StyledTableCell>
          <StyledTableCell>Employee Id</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="left">Aarogya Setu Availability</StyledTableCell>
            <StyledTableCell align="left">Bluetooth Status</StyledTableCell>
            <StyledTableCell align="left">Location Status</StyledTableCell>
            <StyledTableCell align="left">Contact</StyledTableCell>
            <StyledTableCell align="left">Last Sync</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
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
              <StyledTableCell align="left"> <ReactTimeAgo date={row.lastSeen} /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
      <div className={filterdUserData.length ===0 && isEmpty? classes.noRecord : ''}>{filterdUserData.length ===0 && isEmpty? "No record available" : ""}</div>

    </TableContainer>


  );
}