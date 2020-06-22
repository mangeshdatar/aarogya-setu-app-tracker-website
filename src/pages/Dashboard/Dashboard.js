import React, { Component } from 'react';
import Cards from '../../components/Card/Cards';
import EmployeeTable from '../../components/Table/EmployeeTable';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import AddEmployees from '../AddEmployees/AddEmployees'

export default class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = { show: false, active: 'allEmp',
      };
    }
  showModal = () => {
      debugger
        this.setState({ show: true });
        
      };
    
  hideModal = () => {
        debugger
          this.setState({ show: false });
      };
   

    navigateToEmployee() {
    }

  toggle(val){
    if (this.state.active === val) {
      this.setState({active : null})
    } else {
      this.setState({active : val})
    }
  }
  
  boxColor(val) {
    if (this.state.active === val) {
      return "white";
    }
    return "";
  }

  textColor(val) {
    if (this.state.active === val) {
      return "#009fd5";
    }
    return "#8f8d8d";
  }
    
    render() {
        let opacity = this.state.show ? "blackButton" : "whiteButton";


        return (
            <div>
                <div className={opacity}>
                    <Header  show={this.state.show} handleOpen={this.showModal}/>
                </div>
                {/* eslint-disable-next-line */}
                <div className="header"  className={opacity}>
                    <Cards />
                </div>
                <div className={opacity}  >
                <div className="tableContainer">
                <div className="box-container">
                <div className="box" style={{background: this.boxColor('allEmp'), color: this.textColor('allEmp')}} onClick={() => {this.toggle('allEmp')}} >
                    <div className='box-heading'>All Employees</div>
                </div>
                <div className="box" style={{background: this.boxColor('activeEmp'), color: this.textColor('activeEmp')}} onClick={() => {this.toggle('activeEmp')}} >
                    <div className='box-heading'>Active Employees</div>
                </div>
                <div className="box" style={{background: this.boxColor('inActiveEmp'), color: this.textColor('inActiveEmp')}} onClick={() => {this.toggle('inActiveEmp')}}>
                    <div className='box-heading'>In-Active Employees</div>
                </div>
                </div>
                    <EmployeeTable refreshData={this.state.show} activeTab={this.state.active}/>
                </div>
                </div>
                <div>
                    {this.state.show ? <AddEmployees handleClose={this.hideModal}/> : null}
              </div>
            </div>
        )
    }
}
