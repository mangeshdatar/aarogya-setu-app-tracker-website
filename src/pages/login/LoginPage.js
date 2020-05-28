import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginPage.css';
import { db } from '../../services/firebase';
import Alert from '@material-ui/lab/Alert';
import logo from '../../assets/mobiquityLogo.png'

export default class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            input: '',
            password: '',
            button: true,
            invalid:false
        }
    }
    contactSubmit(form) {
        console.log("-----------",this.props.history)
        form.preventDefault();
        db.collection("admin")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data[0].username); 
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
        if (this.state.input.length > 1 && this.state.password.length >1) {
            this.setState({
                button : false
            })
        } else {
            this.setState({
                button: true
            });

          
        }
    }
    render() {
        return (
            <div  className="loginContainer">
                <div className="lableContainer">
                    <div><img src={logo} width="350px" alt="" height="100px"/></div>
                    <div className="appLabel">Aarogya Setu App Tracker</div>
                    </div>
                <form className="formContainer"  noValidate autoComplete="off" onSubmit= {this.contactSubmit.bind(this)}>
                  
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
                <div className="invalidUser">
                    {this.state.invalid ?

                        <Alert severity="error">Invalid User</Alert>: null
                }
                </div> 
            </div>
        )
    }
}
