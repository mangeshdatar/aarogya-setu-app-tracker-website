import React, { Component } from 'react';
import { db } from '../../services/firebase';
import Cards from '../../components/Card/Cards';
import EmployeeTable from '../../components/Table/EmployeeTable';
import './Dashboard.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export default class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            history:this.props.history
        }
    }
    navigateToEmployee() {
    }
    render() {
        return (
            <div>
                <div>
                    <Cards />
                </div>
                <div className="addIcon">
                    <span>Add Employee</span>
                    <Fab color="primary" aria-label="add" onClick={this.navigateToEmployee}>
                        <AddIcon />
                    </Fab>
                </div>
                <div className="tableContainer">
                    <EmployeeTable />
                </div>
            </div>
        )
    }
}
