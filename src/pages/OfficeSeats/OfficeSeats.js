import React, { Component } from 'react'
import "./OfficeSeats.css"
import Dates from '../../components/Dates/Dates'
import SeatTable from '../../components/SeatTable/SeatTable';
export default class OfficeSeats extends Component {
    constructor () {
        super();
        this.state = {
            dataHandler:[
                {
                    date: 5,
                    day: "Monday",
                    month: "Jan"
                },
                {
                    date: 6,
                    day: "Tuesday",
                    month: "Jan"
                },
                {
                    date: 7,
                    day: "Wednesday",
                    month: "Jan"
                },
                {
                    date: 8,
                    day: "Thursday",
                    month: "Jan"
                },
                {
                    date: 9,
                    day: "Friday",
                    month: "Jan"
                },
                {
                    nextWeek: true
                },
            ],
            date:null
        }
    }
    showNextWeekData = (data) => {
        if (data === true) {
            
            this.setState({
                dataHandler: [
                
                    {
                        previousWeek: true
                    },
                    {
                        date: 10,
                        day: "Monday",
                        month: "Jan"
                    },
                    {
                        date: 11,
                        day: "Tuesday",
                        month: "Jan"
                    },
                    {
                        date: 12,
                        day: "Wednesday",
                        month: "Jan"
                    },
                    {
                        date: 13,
                        day: "Thursday",
                        month: "Jan"
                    },
                    {
                        date: 14,
                        day: "Friday",
                        month: "Jan"
                    }
                ]
            })
        } else {
            this.setState({
                dataHandler:    [
                    {
                        date: 5,
                        day: "Monday",
                        month: "Jan"
                    },
                    {
                        date: 6,
                        day: "Tuesday",
                        month: "Jan"
                    },
                    {
                        date: 7,
                        day: "Wednesday",
                        month: "Jan"
                    },
                    {
                        date: 8,
                        day: "Thursday",
                        month: "Jan"
                    },
                    {
                        date: 9,
                        day: "Friday",
                        month: "Jan"
                    },
                    {
                        nextWeek: true
                    },
                ]
            })
        }
    }

    getDataByDate = (date) => {
        this.setState({
            date:date
        })
    }
    render() {
      

        return (
            <div className="officeSeatsContainer">
                <div className="dateView">
                {this.state.dataHandler.map((element, i) => (
                    <Dates key={i} selectedDate={this.state.date} getDates={element} getDate={this.getDataByDate} nextWeekData={this.showNextWeekData} />
                ))}
                    </div>
                <br/>
                <div className="tableView">
                    <SeatTable />
                    </div>
            </div>
        )
    }
}
