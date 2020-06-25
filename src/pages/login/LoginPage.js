import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LoginPage.css";
import { db } from "../../services/firebase";
import Alert from "@material-ui/lab/Alert";
import appLogo from "../../assets/loginLogo.jpg";
import howItWorks from '../../assets/howItWork.png'
import aboutUs from '../../assets/aboutUsLogo.png'
export default class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            input: "",
            password: "",
            button: true,
            invalid: false,
            invalidEmail: false,
            newUser: false,
            contactValidation: false,
            contact: "",
            newUserBtn: true,
            userAdded:false
        };
    }
    contactSubmit(form) {
        form.preventDefault();
        db.collection("adminWeb")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                if (
                    this.state.input === data[0].username &&
                    this.state.password === data[0].password
                ) {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({
                        invalid: true
                    });
                    setTimeout(() => {
                        this.setState({
                            invalid: false
                        });
                    }, 2000);
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
        } else if (field === "contact") {
            this.setState({ contact: event.target.value })
            if (!new RegExp(/^\d{10}$/).test(event.target.value)) {
                this.setState({
                    contactValidation: true
                })
            } else {
                this.setState({
                    contactValidation: false
                })
            }
        }
    }
    buttonDisable() {
        if (
            new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
                this.state.input
            ) &&
            this.state.password.length > 5
        ) {
            this.setState({
                button: false
            });
        } else {
            this.setState({
                button: true
            });
        }
        if ( new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
            this.state.input
        ) && !new RegExp(/^\d{10}$/).test(this.state.contact)) {
            this.setState({
                newUserBtn  :false  
            })
    
}
    }

    checkEmailFormat() {
        if (
            !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
                this.state.input
            )
        ) {
            this.setState({
                invalidEmail: true
            });
        } else {
            this.setState({
                invalidEmail: false
            });
        }
    }

    signUp() {
        this.setState({
            newUser: true
        })
    }

    registerUser(form) {
        form.preventDefault();
        this.setState({
            userAdded: true
        });
        setTimeout(()=>{
            this.setState({
                newUser: false
            });
        },2000);
    }
    render() {
        return (
            <div className="loginContainer">
                <div className="lableContainer">
                    <div>
                        <img src={appLogo} className="applogo" alt="appLogo" />
                    </div>
                    <div className="appLabel">Aarogya Setu App Tracker</div>
                </div>
                <div className="formcontainer">
                    {!this.state.newUser ? (
                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={this.contactSubmit.bind(this)}
                        >
                            <div className="loginFormContainer">
                            <h1 className="signInLable">Sign In</h1>
                            <div className="inputContainer">
                                <TextField
                                    onBlur={this.checkEmailFormat.bind(this)}
                                    fullWidth
                                    color="primary"
                                    id="username"
                                    onChange={e => this.inputFiled(e, "username")}
                                    label="Email Address*"
                                    variant="outlined"
                                />
                            </div>
                            {this.state.invalidEmail ? (
                                <div className="invalidEmail">Invalid email format</div>
                            ) : null}
                            <div className="inputContainer">
                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="password"
                                    onChange={e => this.inputFiled(e, "password")}
                                    label="Password*"
                                    variant="outlined"
                                />
                            </div>
                            <div className="inputContainer">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={this.state.button}
                                >
                                    Sign in
                </Button>
                            </div>
                            <div className="newUserLable">
                                Don’t have account?
                <span onClick={this.signUp.bind(this)} className="signUpLabel">

                                    Sign Up
                </span>
                                </div>
                                </div>
                        </form>
                    ) : null}

                    <div>
                        {this.state.newUser ? (
                            <form
                                noValidate
                                autoComplete="off"
                                onSubmit={this.registerUser.bind(this)}
                            >
                                <div className="newUserContainer">
                                <div className="inputContainer">
                                    <TextField
                                        onBlur={this.checkEmailFormat.bind(this)}
                                        fullWidth
                                        color="primary"
                                        id="username"
                                        onChange={e => this.inputFiled(e, "username")}
                                        label="Email Address*"
                                        variant="outlined"
                                    />
                                </div>
                                {this.state.invalidEmail ? (
                                    <div className="invalidEmail">Invalid email format</div>
                                ) : null}
                                <div className="inputContainer">
                                    <TextField onBlur={e => this.inputFiled(e, "contact")} fullWidth color="primary" id="contact" onChange={e => this.inputFiled(e, "contact")} label="Contact Number*" variant="outlined" />
                                </div>
                                {this.state.contactValidation ?
                                    <div className="invalidEmail">Invalid Contact  Number</div>
                                        : null}
                                   <div className="singUpBtn"> 
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={this.state.newUserBtn}
                                >
                                    Register
                </Button>
                                    </div>
                                    <div className="userAdded">
                    {this.state.userAdded? (
                        <Alert severity="success">We've send Credentials to your email , Kindly check your email!!</Alert>
                    ) : null}
                </div>
                </div>
                            </form>
                        ) : null}
                    </div>
                </div>
                <div className="invalidUser">
                    {this.state.invalid ? (
                        <Alert severity="error">Invalid User</Alert>
                    ) : null}
                </div>

                <div className="footer">
                    < span><img src={howItWorks} width="206px" height="86px"/> </span>
                    < span><img src={aboutUs} width="206px" height="86px"/> </span>

                </div>
            </div>
        );
    }
}
