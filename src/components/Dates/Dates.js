import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import "./Dates.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
export default class Dates extends Component {
    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={6}
                        md={3}
                        lg={1}
                    >
                        <Card className={this.props.getDates.nextWeek || this.props.getDates.previousWeek ? "nextLableContainer" : "dateCardContainer"}>
                            <CardContent >
                                {this.props.getDates.nextWeek || this.props.getDates.previousWeek ?
                                    <div className="nextWeekLable" onClick={e => this.props.nextWeekData(this.props.getDates.nextWeek)}>
                                        {this.props.getDates.nextWeek ?
                                            <div>Next Week
                                                 <ArrowRightAltIcon />

                                            </div>
                                            : <div style={{display:"grid"}}>Previous Week
                                                <ArrowBackIcon/></div>}
                                    </div>
                                    :
                                    <div  onClick={e => this.props.getDate(this.props.getDates.date)}>
                                        <div className={this.props.getDates.date === this.props.selectedDate ? "selected" : "dateContainer"}>
                                        <span className="dateLabel">{this.props.getDates.date}</span>
                                        <span className="monthLabel">{this.props.getDates.day}</span>
                                            <span className="dayLabel">{this.props.getDates.month}</span>
                                            </div>
                                    </div>
                                }

                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
