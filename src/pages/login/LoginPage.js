import React, { Component } from 'react'
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginPage.css'
export default class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            input: '',
            password: '',
            button:true
        }
    }
    contactSubmit(form) {
        form.preventDefault();
        this.props.history.push('/dashboard')
    }

    inputFiled(event, field) {
        this.buttonDisable();
        if (field === "username") {
            this.setState({
                input: event.target.value
            }); 
        } else if (field === "password") {
            this.setState({
                password: event.target.value
            }); 
        }
    }
    buttonDisable() {
        if (this.state.input.length > 1 && this.state.password.length >1) {
            this.setState({
                button : false
            })
        } else {
            this.setState({
                button : true
            }) 
        }
    }
    render() {
        return (
            <div>
                <form className="loginContainer" noValidate autoComplete="off" onSubmit= {this.contactSubmit.bind(this)}>
                    <div className="margin10">
                        <LockOpenSharpIcon />
                    </div>
                    <h1 className="signInLable">Sign In</h1>
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="username" onChange={e=>this.inputFiled(e,"username")} label="Email Address*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="password" onChange={e=>this.inputFiled(e,"password")}  label="Password*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={this.state.button}>
                        Sign in

                        </Button>
                        </div>
                </form>
            </div>
        )
    }
}
