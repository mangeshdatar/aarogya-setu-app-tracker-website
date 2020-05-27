import React, { Component } from 'react';
import { db } from '../../services/firebase';
import Cards from '../../components/Card/Cards';
import EmployeeTable from '../../components/Table/EmployeeTable';
import './Dashboard.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Header from '../../components/Header/Header';


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
                    <Header/>
                </div>
                <div className="header">
                    <Cards />
                </div>
                <div className="tableContainer">
                    <EmployeeTable />
                </div>
            </div>
        )
    }
}
