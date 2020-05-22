import React, { Component } from 'react'
import { Card, Typography, Grid, CardContent } from '@material-ui/core';
import styles from './Card.css';
import CountUp from 'react-countup'
import cx from 'classnames';
import {getUsers} from '../../services/getUsers'
export default class Cards extends Component {
    constructor (props) {
        super(props);
        this.state = {
            totalEmployee: 0,
            activeEmployee: 0,
            inactiveEmployee:0
        }
    }

    async  componentDidMount() {
        const fetchData = await getUsers();
        this.filterEmployeeData(fetchData)
      }
    filterEmployeeData(userData) {

        this.setState({
            totalEmployee: userData.length
        });
        userData.forEach(user => {
            if (user.appAvailability) {
                this.setState({
                    activeEmployee: this.state.activeEmployee+1
                });

            }
        });
        this.setState({
            inactiveEmployee : this.state.totalEmployee - this.state.activeEmployee
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.employee}>
                <CardContent>
                        <Typography color="textPrimary" gutterBottom>Employee List</Typography>
                    </CardContent>
                </div>
                 
            <Grid container spacing={2} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Total Employees</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                duration={2.5}
                                separator=","
                                end={this.state.totalEmployee}
                            />
                        </Typography>
                        <Typography color="textPrimary">{new Date().toDateString()}</Typography>
                        <Typography variant="body2">Total Employee </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Active </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                duration={2.5}
                                separator=","
                                end={this.state.activeEmployee}
                            />
                        </Typography>
                        <Typography color="textPrimary">{new Date().toDateString()}</Typography>
                        <Typography variant="body2">Active Employee on Aarogya Setu</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Absent</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                duration={2.5}
                                separator=","
                                end={this.state.inactiveEmployee}
                            />
                        </Typography>
                        <Typography color="textPrimary">{new Date().toDateString()}</Typography>
                        <Typography variant="body2">In-Active Employee on Aarogya Setu</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
        )
    }
}
