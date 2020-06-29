import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { db, newID } from '../../services/firebase';
import './AddEmployees.css';
import closeIcon from '../../assets/closeIcon.png';
import Alert from '@material-ui/lab/Alert';

import { config } from '../../environments/environment'
import Dropzone from 'react-dropzone';

import { storage } from '../../services/firebase';
import readXlsxFile from 'read-excel-file'
import downloadSampleFile from '../../assets/downloadSample.png';
import uploadButton from '../../assets/uploadButton.png';
import {firebaseApp} from '../../services/firebase'


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
            userAdded: false,
            fileName: "",
            validFile: false,
            uploadedRecord: false,
            new_data: {}

        }

        this.postEmployeeData = this.postEmployeeData.bind(this);
        this.insertEmployeeData = this.insertEmployeeData.bind(this)

    }

    contactSubmit(form) {
        form.preventDefault();
        if (!this.checkFileds()) {
            return
        }

        let myScope = this;
        var dateTime = myScope.getTime();
        db.collection("users").doc(newID.key).set({
            email: this.state.email,
            password: newID.key,
            id: newID.key,
        }).then(() => {
            console.log("userAdded..")
        })
        db.collection("userInfo").doc(newID.key).set({
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
            lastSeen: dateTime
        })
            .then(function () {
                myScope.setState({
                    userAdded: true,
                    button: true
                });
                document.getElementById("form").reset();
                const templateParams = {
                    userName: myScope.state.name,
                    senderEmail: config.senderEmail,
                    receiverEmail: myScope.state.email,
                    feedback: 'Email sent',
                    emailBody: {
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
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    getTime() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    }
    sendEmail = (templateId, templateParams, user) => {
        window.emailjs.send(
            'gmail', // email provider in your EmailJS account
            templateId,
            templateParams,
            user,
        )
            .then(res => {
            })
            .catch(err => console.error('Failed to send feedback. Error: ', err))
    }
    inputFiled(event, field) {
        switch (field) {
            case "empId":
                this.setState({ empId: event.target.value });
                if (event.target.value.length < 4) {
                    this.setState({
                        empIdValidation: true
                    })
                } else {
                    this.setState({
                        empIdValidation: false
                    })
                }
                break;
            case "name":
                this.setState({ name: event.target.value });
                if (event.target.value.length < 4) {
                    this.setState({
                        nameValidation: true
                    })
                } else {
                    this.setState({
                        nameValidation: false
                    })
                }
                break;
            case "email":
                this.setState({ email: event.target.value });
                if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(event.target.value)) {
                    this.setState({
                        emailValidation: true
                    })
                } else {
                    this.setState({
                        emailValidation: false
                    })
                }
                break;
            case "contact":
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

    checkFileds() {
        return this.state.empId.length > 4 &&
            new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email) &&
            new RegExp(/^\d{10}$/).test(this.state.contact)
    }
    buttonDisable() {
        if (
            this.state.name.length > 4 &&
            this.state.empId.length > 4 &&
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
    uploadExcelSheet(uploadFile) {
        this.setState({
            new_data: Object.assign({}, uploadFile),
            fileName:uploadFile[0].name
        });
        if (this.state.new_data[0].name.includes("xlsx")) {
            readXlsxFile(this.state.new_data[0]).then((rows) => {
                if (rows[0][0] === "Empolyee Id" && rows[0][1] === "Employee Name" && rows[0][2] === "Employee Email" && rows[0][3] === "Employee Contact") {
                    this.setState({
                        validFile: false
                    })
                } else {
                    this.setState({
                        validFile: true
                    })
                }
            })
        } else {
            this.setState({
                validFile: true
            })
        }
    }
    downloadFile() {
        storage.child('Employee Details.xlsx').getDownloadURL().then((url) => {
            window.open(url);
        }).catch((error) => {
        })
    }

    postEmployeeData() {
        if (this.state.new_data[0].name.includes("xlsx")) {
            readXlsxFile(this.state.new_data[0]).then((rows) => {
                console.log(rows)
                if (rows[0][0] === "Empolyee Id" && rows[0][1] === "Employee Name" && rows[0][2] === "Employee Email" && rows[0][3] === "Employee Contact") {
                    let skipFirstColomn = 0;
                    rows.forEach((row) => {
                        skipFirstColomn++;
                        
                        if (skipFirstColomn >= 2) {
                            this.insertEmployeeData(row)
                        }
                    })
                }
            })
        }
    }
    insertEmployeeData(data) {
        console.log("called");
        var fir = firebaseApp
        const newID1 = fir.database().ref().push()

        var dateTime = this.getTime();
        let myScope = this;
        db.collection("userInfo").doc(newID1.key).set({
            employeeId: data[0],
            name: data[1],
            email: data[2],
            contactNo: data[3],
            password: newID.key,
            appAvailability: false,
            bluetoothStatus: false,
            locationStatus: false,
            devicePlatform: '',
            id: newID.key,
            lastSeen: dateTime
        }).then(function () {
            myScope.setState({
                uploadedRecord: true,
                validFile: false
            });
            debugger
            const templateParams = {
                userName: data[1],
                senderEmail: config.senderEmail,
                receiverEmail: data[2],
                feedback: 'Email sent',
                emailBody: {
                    msg: 'Please login to aarogya setu tracker app using following credentials:',
                    password: newID.key,
                }
            }

            myScope.sendEmail(
                config.emailTemplateId,
                templateParams,
                config.emailUserId,
            )

            // setTimeout(() => {
            //     myScope.props.handleClose();

            // }, 1000)
        }).catch(function (error) {
        });
    }

    render() {
        return (
            <div>
                <form className={this.props.uploadRecord ? "uploadWidth":"employeeWidth"} id="form" noValidate autoComplete="off" onSubmit={e => this.contactSubmit(e)}>
                    <span className="crossIcon" onClick={e => this.props.handleClose()}>  <img className="crossImg" src={closeIcon} width="40px" height="40px" alt="" />  </span>
                    <div className={this.props.uploadRecord ? "hide" : null}>
                        <div className="inputContainer addPadding">
                            <TextField onBlur={e => this.inputFiled(e, "empId")} fullWidth color="primary" id="empId" onChange={e => this.inputFiled(e, "empId")} label="Employee Id*" variant="outlined" />
                        </div>
                        {this.state.empIdValidation ?
                            <div className="invalidEmail">Invalid Employee Id</div>
                            : null}

                        <div className="inputContainer">
                            <TextField onBlur={e => this.inputFiled(e, "name")} fullWidth color="primary" id="name" onChange={e => this.inputFiled(e, "name")} label="Employee Name*" variant="outlined" />
                        </div>
                        {this.state.nameValidation ?
                            <div className="invalidEmail">Invalid Name Format</div>
                            : null}

                        <div className="inputContainer">
                            <TextField onBlur={e => this.inputFiled(e, "email")} fullWidth color="primary" id="email" onChange={e => this.inputFiled(e, "email")} label="Employee Email*" variant="outlined" />
                        </div>
                        {this.state.emailValidation ?
                            <div className="invalidEmail">Invalid email format</div>
                            : null}

                        <div className="inputContainer">
                            <TextField onBlur={e => this.inputFiled(e, "contact")} fullWidth color="primary" id="contact" onChange={e => this.inputFiled(e, "contact")} label="Contact Number*" variant="outlined" />
                        </div>
                        {this.state.contactValidation ?
                            <div className="invalidEmail">Invalid Contact  Number</div>
                            : null}


                        <div className="inputContainer">
                            <Button type="submit" fullWidth variant="contained" color="primary" disabled={this.state.button}>
                                Add Employee
                        </Button>
                        </div>

                    </div>
                    <div className={this.props.uploadRecord ? null : "hide"}>
                        <div className="fileContainer">
                            <div className="dragFile">
                            <Dropzone onDrop={acceptedFiles => this.uploadExcelSheet(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <div className="fileText">
                                               <div> Drag and drop Excel file here</div>
                                               <div> or</div>
                                               <div style={{textDecoration:"underline"}} > Select it</div>
                                                </div>
                                            <input {...getInputProps()} className="fileInput" placeholder="select" />

                                        </div>
                                    </section>
                                )}
                                </Dropzone>
                            </div>
                            <span className="fileName">

                                {this.state.fileName.length > 1 && !this.state.validFile  ?
                                    <Alert severity="info">{this.state.fileName}</Alert>

                                : null}
                            </span>
                            <div className="uploadBtn">
                                <img src={uploadButton} onClick={()=> this.postEmployeeData()} width="320px" height="45px" />
                            </div>
                          
                            <div className="downloadBtn">
                                <img width="230px" height="25px" onClick={() => this.downloadFile()} src={downloadSampleFile} />

                            </div>


                            <div style={{marginTop:"30px"}}>
                                {
                                    this.state.validFile ?
                                        <Alert severity="error">Please upload valid Excelsheet File</Alert>
                                        : null
                                }

                            </div>
                         
                        </div>
                        <div className="validUser">
                            {this.state.uploadedRecord ?

                                <Alert severity="success">Uploaded Employee Record's Successfully</Alert> : null
                            }
                        </div>
                    </div>
                    <div className="validUser">
                        {this.state.userAdded ?

                            <Alert severity="success">Added Employee Successfully</Alert> : null
                        }
                    </div>
                </form>
            </div>
        )
    }
}
