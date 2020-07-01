import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';





function createData(id,name, email, contact) {
    return {id,name, email, contact };
  }
  
  const rows = [
    createData( "MOBPUNE-98", 'Mangesh', "mangesh@gmail.com", 74444949),
    createData( "MOBPUNE-101", 'Anjali', "anjali@gmail.com", 83333333),
    createData( "MOBPUNE-91", 'Suchita', "mangesh@gmail.com", 99223333),
  ];
export default  function SeatTable(value) {

  
  
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
          <TableCell>Sr No.</TableCell>
          <TableCell>Employee Id</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Employee Email</TableCell> 
          
            <TableCell align="left">Contact</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.contact}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>

      </Table>

    </TableContainer>


  );
}