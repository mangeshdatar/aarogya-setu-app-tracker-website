import React, { Component } from 'react'
import './Header.css';
import mobiquityLogo from '../../assets/mobiquityLogo.png';
import addButton from '../../assets/addButton.png';
import logoutButton from '../../assets/logout.png';
export default class Header extends Component {
    render() {
        return (
            <div className='header-container'>
                <span className='logo'>
                    <img src={mobiquityLogo} width="100%"/>
                </span>
                <span className='inputcontainer'>
               <input className="input" placeholder="Search Employee"/>
                </span>

                <span className="addButton">
                    <img className="buttonicon" src={addButton} width="100%"/>
                </span>
                <div className="logincontainer">
                    <span>
                        <img className="logout" src={logoutButton} width="100%" />
                        </span>
                    <span className="signOutLable">Sign Out</span>
                </div>
            </div>
        )
    }
}
