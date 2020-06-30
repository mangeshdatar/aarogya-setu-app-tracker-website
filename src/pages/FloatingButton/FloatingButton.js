import React, { Component } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';

import "./FloatingButton.css"
export default class FloatingButton extends Component {
  constructor () {
    super();
    this.state = {
      hidden: false,
      open:false
    }
    this.handleOpen = this.handleOpen.bind(this)
  }
   handleClose = () => {
     this.setState({
       open :false
     })
  };

  handleOpen = ()=> {
    this.setState({
      open :true
    })
  };
  
  addEmployee = () => {
    console.log("add single user");
  }

  uploadRecords = () => {
    console.log("upload Records")
  }
    render() {
      
       
        return (
          <div className="floatingBtn">

            <span className="label"> Add Employee</span>
            <div className="btn">
        <SpeedDial
          ariaLabel="SpeedDial example"
          hidden={this.state.hidden}
          icon={<SpeedDialIcon />}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          open={this.state.open}
          direction="right"
        >
            <SpeedDialAction
              icon={<FileCopyIcon />}
              tooltipTitle="addEmployee"
                onClick={e => this.props.openEmployeeModal()
                }
              />
                <SpeedDialAction
              icon={<SaveIcon />}
              tooltipTitle="uploadRecords"
              onClick={e =>this.props.openUploadRecord()}
            />
        </SpeedDial>
            </div>
            </div>
        )
    }
}
