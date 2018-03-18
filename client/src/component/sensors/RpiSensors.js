import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Sensors.css';
import axios from "axios/index";
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Charts from './Charts';
let serverConfig = require('../../config/Config').server;
let moment = require('moment');

let tempArray;
let humArray;
let latestTemp;
let latestHum;

class RpiSensors extends Component {

    constructor(props){
        super(props);

        this.state = {

            isLoaded: false,
        };
    }

    fetchValues () {

        tempArray = [];
        humArray = [];

        let day = 1000 * 60 * 60 * 24;
        let d = Date.now() - day;

        let newD = new Date(d);
        newD = newD.toISOString();

        let urlQueary = serverConfig.url + '/properties/sensor/search' + '?since=' + newD;

        return axios.get(urlQueary)
                .then((response) => {

                    let res = response.data;

                    let data = res.filter((element, index) => {
                        return index % 3 === 0;
                    });

                    data.forEach((i) => {

                        let value = i.value.toFixed(1);

                        let date = new Date(i.timestamp);
                        let label = addZero(date.getHours()) + ':' + addZero(date.getMinutes());

                        let tempObj = {
                            label: label,
                            value: value,
                        };

                        if (i.type === 'Temperature') {
                            tempArray.push(tempObj)
                        } else {
                            humArray.push(tempObj);
                        }

                    });

                }).then(() => {
                    this.fetchLatest();
            });

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    }

    fetchLatest() {

        latestTemp = {};
        latestHum = {};

        return axios.get(serverConfig.url + '/properties/temperature/latest')
                .then((response) => {
                    latestTemp = response.data;
                })
            .then(() => {

                axios.get(serverConfig.url + '/properties/humidity/latest')
                    .then((response) => {
                        latestHum = response.data;
                    })
                    .then(() => {
                        console.log(latestTemp);
                        console.log(latestHum);
                        this.setState({
                            isLoaded: true,
                        });
                    });
            })
            .catch((error) => {
                throw new Error(error);
            })
    }

    componentDidMount() {

        this.fetchValues();
    }

    render() {
        return (
            <Router>
                <div className="RpiSensors">
                    {this.state.isLoaded ? (
                        <div className="Chart-body">
                            <div className="Chart">
                                <div className="Chart-inner">
                                    <Charts data={tempArray} type={'Temperature'}/>
                                    <div className="Chart-inner-text">
                                        <p className="Chart-text-value">{'Latest: ' + latestTemp.value.toFixed(1) + latestTemp.unit_display}</p>
                                        <p className="Chart-text-since">{'Updated ' + moment(latestTemp.date).fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Chart">
                                <div className="Chart-inner">
                                    <Charts data={humArray} type={'Humidity'}/>
                                    <div className="Chart-inner-text">
                                        <p className="Chart-text-value">{'Latest: ' + latestHum.value.toFixed(1) + latestHum.unit_display}</p>
                                        <p className="Chart-text-since">{'Updated ' + moment(latestHum.date).fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CircularProgress style={style.spinner}/>
                    )}

                </div>
            </Router>
        );
    }
}

export default RpiSensors;

const style = {
    spinner: {

        margin: 'auto',
    }
};