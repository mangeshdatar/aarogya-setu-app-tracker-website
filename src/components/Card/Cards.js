import React, { Component } from "react";
import { Card, Typography, Grid, CardContent } from "@material-ui/core";
import styles from "./Card.css";
import CountUp from "react-countup";
import cx from "classnames";
import { getUsers } from "../../services/getUsers";
import "./Card.css";
import blueLogo from '../../assets/blueLogo.png'
import greenLogo from '../../assets/greenLogo.png';
import redLogo from '../../assets/redLogo.png'
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalEmployee: 0,
      activeEmployee: 0,
      inactiveEmployee: 0
    };
  }

  async componentDidMount() {
    const fetchData = await getUsers();
    this.filterEmployeeData(fetchData);
  }
  filterEmployeeData(userData) {
    this.setState({
      totalEmployee: userData.length
    });
    userData.forEach(user => {
      if (user.appAvailability) {
        this.setState({
          activeEmployee: this.state.activeEmployee + 1
        });
      }
    });
    this.setState({
      inactiveEmployee: this.state.totalEmployee - this.state.activeEmployee
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Grid className={styles.logo}>
                <div> <img src={blueLogo} width="60px;"/> </div>
              </Grid>
              <div className='details'>
                <CountUp
                  start={0}
                  duration={2.5}
                  separator=","
                  end={this.state.totalEmployee}
                  className="countNumber"
                />
                <div className='text'>Total Mobiquity Employees</div>
              </div>
            </CardContent>
          </Grid>
          <Grid
            item
            direction="column"
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Grid className={styles.logo}>
                <div><img src={greenLogo} width="60px;"/></div>
              </Grid>
              <div className='details'>
                <CountUp
                  start={0}
                  duration={2.5}
                  separator=","
                  end={this.state.activeEmployee}
                  className="countNumber"

                />
                <div className='text'>Active Employees on Aarogya-setu </div>
              </div>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.deaths)}
          >
            <CardContent>
              <Grid className={styles.logo}>
                <div><img src={redLogo} width="60px;"/></div>
              </Grid>
              <div className='details'>
                <CountUp
                  start={0}
                  duration={2.5}
                  separator=","
                  end={this.state.inactiveEmployee}
                  className="countNumber"
                />
                <div className='text'>In-Active Employees on Aarogya-setu</div>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  }
}
