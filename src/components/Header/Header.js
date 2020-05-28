import React, { Component } from 'react'
import './Header.css';
import mobiquityLogo from '../../assets/mobiquityLogo.png';
import addButton from '../../assets/addButton.png';
import logoutButton from '../../assets/logout.png';
export default class Header extends Component {
    state = {
        show: false
      };

    render() {
        return (
            <div className='header-container'>
                <span className='logo'>
                    <img src={mobiquityLogo} alt="" width="100%"/>
                </span>
                <span className='inputcontainer'>
               <input className="input" placeholder="Search Employee"/>
                </span>

                <span className="addButton" onClick={e => this.props.handleOpen()}>
                    <img className="buttonicon" alt="" src={addButton} width="100%"/>
                </span>
                <div className="vertical-line"></div>
                <div className="logincontainer">
                    <span>
                        <img className="logout" alt="" src={logoutButton} width="100%" />
                        </span>
                </div>
                <span className="signOutLable">Sign Out</span>
            </div>
        )
    }
}
