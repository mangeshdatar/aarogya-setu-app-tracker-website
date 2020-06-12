import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { db, newID } from '../../services/firebase';
import './AddEmployees.css';
import closeIcon from '../../assets/closeIcon.png';
import Alert from '@material-ui/lab/Alert';

import { config } from '../../environments/environment'

export default class AddEmployees extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            empId: '',
            email: '',
            contact: '',
            password: '',
            button: true,
            invalid: false,
            nameValidation: false,
            empIdValidation: false,
            emailValidation: false,
            contactValidation: false,
            userAdded:false

        }
    }
    contactSubmit(form) {
        form.preventDefault();
        let myScope = this;
        console.log(form);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        db.collection("user").doc(newID.key).set({
            name: this.state.name,
            employeeId: this.state.empId,
            email: this.state.email,
            contactNo: this.state.contact,
            password: newID.key,
            appAvailability: false,
            bluetoothStatus: false,
            locationStatus: false,
            devicePlatform: '',
            id: newID.key,
            lastSeen:dateTime
        })
            .then(function () {
                myScope.setState({
                    userAdded: true,
                    button:true
                });
                document.getElementById("form").reset();
                // myScope.buttonDisable();
                console.log("Document successfully written!");
            const  templateParams = {
                userName: myScope.state.name,
                senderEmail: config.senderEmail,
                receiverEmail: myScope.state.email,
                feedback: 'Email sent',
                emailBody : {
                    msg: 'Please login to aarogya setu tracker app using following credentials:',
                    password: newID.key,
                }
                }
                
              myScope.sendEmail(
                config.emailTemplateId,
                templateParams,
                config.emailUserId,
              )
               
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    sendEmail = (templateId, templateParams, user ) => {
          window.emailjs.send(
            'gmail', // email provider in your EmailJS account
            templateId,
            templateParams,
            user,
          )
            .then(res => {
              console.log('Email sent successfully', res)
            })
            .catch(err => console.error('Failed to send feedback. Error: ', err))
        }
    inputFiled(event, field) {
        switch (field) {
            case "empId":
                this.setState({ empId: event.target.value });
                if (event.target.value.length < 4 ) {
                    this.setState({
                        empIdValidation:true
                    })
                } else {
                    this.setState({
                        empIdValidation:false
                    }) 
                }
                break;
            case "name":
                this.setState({ name: event.target.value });
                if (event.target.value.length < 4 ) {
                    this.setState({
                        nameValidation:true
                    })
                } else {
                    this.setState({
                        nameValidation:false
                    }) 
                }
                break;
            case "email":
                this.setState({ email: event.target.value });
                if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(event.target.value) ) {
                    this.setState({
                        emailValidation:true
                    })
                } else {
                    this.setState({
                        emailValidation:false
                    }) 
                }
                break;
            case "contact":
                this.setState({ contact: event.target.value })
                if (!new RegExp(/^\d{10}$/).test(event.target.value) ) {
                    this.setState({
                        contactValidation:true
                    })
                } else {
                    this.setState({
                        contactValidation:false
                    }) 
                }
                break;
            default:
                return null;
        }
        if (field === "username") {
            this.setState({
                input: event.target.value
            });
        } else if (field === "password") {
            this.setState({
                password: event.target.value
            });
        }
        this.buttonDisable();

    }
    buttonDisable() {
        console.log(this.state.name);
        console.log(this.state.empId.length>4);
        console.log(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email));
                console.log(new RegExp(/^\d{10}$/).test(this.state.contact))
        if (
            this.state.name.length > 4 &&
            this.state.empId.length>4 &&
            new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email) &&
            new RegExp(/^\d{10}$/).test(this.state.contact)
        ) {
            this.setState({
                button: false
            })
        } else {
            this.setState({
                button: true
            })  
        }
    }
   
    render() {
        return (
            <div>
                <form className="formContainer" id="form" noValidate autoComplete="off" onSubmit={e => this.contactSubmit(e)}>
                    <span className="crossIcon" onClick={e => this.props.handleClose()}>  <img  className="crossImg" src={closeIcon} width="40px" height="40px" alt="" />  </span>
                    <div className="inputContainer addPadding">
                        <TextField onBlur={e =>this.inputFiled(e,"empId")} fullWidth color="primary" id="empId" onChange={e => this.inputFiled(e, "empId")} label="Employee Id*" variant="outlined" />
                    </div>
                    {this.state.empIdValidation ? 
                                        <div className="invalidEmail">Invalid Employee Id</div>
                                        : null}

                    <div className="inputContainer">
                        <TextField onBlur={e =>this.inputFiled(e,"name")} fullWidth color="primary" id="name" onChange={e => this.inputFiled(e, "name")} label="Employee Name*" variant="outlined" />
                    </div>
                    {this.state.nameValidation ? 
                                        <div className="invalidEmail">Invalid Name Format</div>
                                        : null}

                    <div className="inputContainer">
                        <TextField onBlur={e =>this.inputFiled(e,"email")} fullWidth color="primary" id="email" onChange={e => this.inputFiled(e, "email")} label="Employee Email*" variant="outlined" />
                    </div>
                    {this.state.emailValidation ? 
                                        <div className="invalidEmail">Invalid email format</div>
                                        : null}

                    <div className="inputContainer">
                        <TextField onBlur={e =>this.inputFiled(e,"contact")} fullWidth color="primary" id="contact" onChange={e => this.inputFiled(e, "contact")} label="Contact Number*" variant="outlined" />
                    </div>
                    {this.state.contactValidation? 
                                        <div className="invalidEmail">Invalid Contact  Number</div>
                                        : null}

                    <div className="inputContainer">
                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={this.state.button}>
                            Add Employee
                        </Button>

                    </div>
                    <div className="validUser">
                    {this.state.userAdded ?

                        <Alert severity="success">Added Employee Successfully</Alert>: null
                }
                </div> 
                </form>
            </div>
        )
    }
}
