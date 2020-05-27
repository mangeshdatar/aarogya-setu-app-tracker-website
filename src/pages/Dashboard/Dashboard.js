import React, { Component } from 'react';
import Cards from '../../components/Card/Cards';
import EmployeeTable from '../../components/Table/EmployeeTable';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import AddEmployees from '../AddEmployees/AddEmployees'

export default class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = { show: false };


    }
    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
          this.setState({ show: false });
          console.log("clicked",this.state.show)
      };
   
    render() {
        let opacity = this.state.show ? "blackButton" : "whiteButton";


        return (
            <div>
                <div className={opacity}>
                    <Header  show={this.state.show} handleOpen={this.showModal}/>
                </div>
                <div className="header"  className={opacity}>
                    <Cards />
                </div>
                <div className={opacity}  >
                    <div className="tableContainer">
                        <EmployeeTable />
                        </div>
                </div>
                <div>
                    {this.state.show ? <AddEmployees handleClose={this.hideModal}/> : null}
              </div>
               
            </div>
        )
    }
}
