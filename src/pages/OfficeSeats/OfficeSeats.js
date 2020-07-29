import React, { Component } from 'react'
import "./OfficeSeats.css"
import Dates from '../../components/Dates/Dates'
import SeatTable from '../../components/SeatTable/SeatTable';
import axios from "axios"


export default class OfficeSeats extends Component {
    constructor () {
        super();
        this.state = {
            dataHandler: [],      
            date: null,
            apiData: ""
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8081/week/userWeekData", { headers: { "user-id": "dd" } }
        ).then((response) => {
            this.setState({
                apiData: response.data
            });
            this.setCurrentWeekData();
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }
    weekdate = (year, week, dayNumber) => {
        var j1 = new Date(year, 0, 10, 12, 0, 0),
            j2 = new Date(year, 0, 4, 12, 0, 0),
            mon1 = j2.getTime() - j1.getDay() * 86400000;
        return new Date(mon1 + ((week - 1) * 7 + (dayNumber - 1)) * 86400000);
    }

    showNextWeekData = (data) => {
        if (data === true) {
            this.setState({
                dataHandler: this.state.dataHandler = []
            })
            this.setNextWeekData();
        } else {
            this.setState({
                dataHandler: this.state.dataHandler = []
            })
            this.setState({ dataHandler: null })
            this.setCurrentWeekData();
        }
    }
    setCurrentWeekData() {
        var array = [];
        this.state.apiData.currentWeekBookings.forEach((item) => {
            var formattedDate = item.id.split("-");
            var date = this.weekdate(formattedDate[0], formattedDate[1], formattedDate[2]).toDateString();
            var tempDate = date.split(" ");
            array.push({
                date: tempDate[2],
                day: tempDate[0],
                month: tempDate[1],
                id:item.id
            })
        });
        array.push({ nextWeek: true })
        this.setState({
            dataHandler: array
        });
    }

    setNextWeekData() {
        var array = [];
        array.push({ previousWeek: true })
        this.state.apiData.nextWeekBookings.forEach((item) => {
            debugger
            var formattedDate = item.id.split("-");
            var date = this.weekdate(formattedDate[0], formattedDate[1], formattedDate[2]).toDateString();
            var tempDate = date.split(" ");
            array.push({
                date: tempDate[2],
                day: tempDate[0],
                month: tempDate[1],
                id:item.id
            })          
        })
  this.setState({
                dataHandler:this.state.dataHandler =array
            });
    }
    getDataByDate = (date) => {
        this.setState({
            date: date
        })
    }
    render() {

        return (
            <div className="officeSeatsContainer">
                <div className="dateView">
                    { Array.isArray(this.state.dataHandler) && this.state.dataHandler.map((element, i) => (
                        <Dates key={i} selectedDate={this.state.date} getDates={element} getDate={this.getDataByDate} nextWeekData={this.showNextWeekData} />
                    ))}
                </div>
                <br />
                <div className="tableView">
                    <SeatTable />
                </div>
            </div>
        )
    }
}
