import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {db ,newID} from '../../services/firebase'
export default class AddEmployees extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            empId: '',
            email: '',
            contact: '',
            password: '',
            appAvailability: false,
            bluetoothStatus: false,
            locationStatus: false,
            devicePlatform: '',
            id: '',
            button: true,
            invalid: false
        }
    }
    contactSubmit(form) {
        form.preventDefault();
      
        db.collection("user").doc(newID.key).set({
            name: this.state.name,
            employeeId: this.state.empId,
            email: this.state.email,
            contact: this.state.contact,
            password: newID.key,
            appAvailability: false,
            bluetoothStatus: false,
            locationStatus: false,
            devicePlatform: '',
            id:newID.key
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    setValues(state, value) {
        this.setState({
            state: value
        })
    }
    inputFiled(event, field) {
        this.buttonDisable();
        switch (field) {
            case "empId":
                this.setState({ empId: event.target.value })
                break;
            case "name":
                this.setState({ name: event.target.value })
                break;
            case "email":
                this.setState({ email: event.target.value })
                break;
            case "contact":
                this.setState({ contact: event.target.value })
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
    }
    buttonDisable() {
        if (
            this.state.empId.length > 1 && this.state.name.length > 2 &&
            this.state.contact.length > 2 && this.state.email.length
        ) {
            this.setState({
                button: false
            })
        }
    }
    render() {
        return (
            <div>
                <form className="loginContainer" noValidate autoComplete="off" onSubmit={this.contactSubmit.bind(this)}>
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="empId" onChange={e => this.inputFiled(e, "empId")} label="Employee Id*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="name" onChange={e => this.inputFiled(e, "name")} label="Employee Name*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="email" onChange={e => this.inputFiled(e, "email")} label="Employee Email*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                        <TextField fullWidth color="primary" id="contact" onChange={e => this.inputFiled(e, "contact")} label="Contact Number*" variant="outlined" />
                    </div>
                    <div className="inputContainer">
                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={this.state.button}>
                            Add Employee
                        </Button>

                    </div>
                </form>
            </div>
        )
    }
}
