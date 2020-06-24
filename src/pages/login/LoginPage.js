import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginPage.css';
import { db } from '../../services/firebase';
import Alert from '@material-ui/lab/Alert';
import appLogo from '../../assets/loginLogo.jpg';

export default class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            input: '',
            password: '',
            button: true,
            invalid: false,
            invalidEmail:false
        }
    }
    contactSubmit(form) {
        form.preventDefault();
        db.collection("adminWeb")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
            if (this.state.input === data[0].username && this.state.password === data[0].password) {
                    this.props.history.push('/dashboard')
            } else {
                this.setState({
                    invalid: true
                });
                setTimeout(() => {
                    this.setState({
                        invalid: false
                    });
                },2000)
            }
        });
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
        if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.input) && this.state.password.length >5) {
            this.setState({
                button : false
            })
        } else {
            this.setState({
                button: true
            });
        }
    }

    checkEmailFormat() {
        if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.input)) {
            this.setState({
                invalidEmail:true
            })
        } else {
            this.setState({
                invalidEmail:false
            }) 
        }
    }
    render() {
        return (
            <div  className="loginContainer">
                <div className="lableContainer">
                    <div><img src={appLogo} className="applogo" alt="appLogo" /></div>
                    <div className="appLabel">Aarogya Setu App Tracker</div>
                    </div>
                <form className="formcontainer"  noValidate autoComplete="off" onSubmit= {this.contactSubmit.bind(this)}>
                  
                    <h1 className="signInLable">Sign In</h1>
                    <div className="inputContainer">
                        <TextField onBlur={this.checkEmailFormat.bind(this)} fullWidth color="primary" id="username" onChange={e=>this.inputFiled(e,"username")} label="Email Address*" variant="outlined" />
                    </div>
                    {this.state.invalidEmail ?
                        <div className="invalidEmail">Invalid email format</div>
                    : null}
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="password" onChange={e=>this.inputFiled(e,"password")}  label="Password*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={this.state.button}>
                        Sign in
    
                        </Button>
                       
                        </div>
                </form>
                <div className="invalidUser">
                    {this.state.invalid ?

                        <Alert severity="error">Invalid User</Alert>: null
                }
                </div> 
            </div>
        )
    }
}
