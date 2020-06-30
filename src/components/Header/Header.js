import React, { Component } from 'react'
import './Header.css';
import appLogo from '../../assets/appLogo.png';
import addButton from '../../assets/addEmployee.png';
import uploadRecords from '../../assets/uploadRecords.png'
import logoutButton from '../../assets/logout.png';
import Grid from '@material-ui/core/Grid';

export default class Header extends Component {
    getSearchQuery(event) {
        let query =  event.target.value
        this.props.searchHandler(query.toLocaleLowerCase());
    }

    render() {
        return (
            <Grid container >

                <div className='header-container'>
                    <Grid item xs={3} >

                        <span className='logo'>
                            <img src={appLogo} className="appLogo" alt="" height="50px" width="50px" />
                            <span className="appName">Aarogya Setu App Tracker</span>
                        </span>
                    </Grid>
                    <Grid item xs={3}>

                        
                        
                        <span className='inputcontainer'>
                            <input className="input" placeholder="Search Employee" id="search"  autocomplete="off" onChange={e => this.getSearchQuery(e)}/>
                        </span>
                    </Grid>
                    <Grid item xs={2}>

                        <span className="addButton" onClick={e => this.props.gotoHome()}>
                            Home
                    </span>
                    </Grid>
                    <Grid item xs={3}>

                        <span className="uploadButton" onClick={e => this.props.gotoSeatAvailability()}>
                            View Employee
                        </span>
                        </Grid>

                    <div className="vertical-line"></div>
                    <Grid item xs={1}   alignItems="flex-end">

                    <div className="logincontainer">
                        <span>
                                <img className="logout" alt="" src={logoutButton} width="100%" />
                                <span className="signOutLable">Sign Out</span>

                        </span>
                    </div>
                  
                        </Grid>
                </div>
            </Grid>
        )
    }
}
