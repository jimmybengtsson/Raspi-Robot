import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Sensors.css';
import axios from "axios/index";
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Charts from './Charts';
import Auth from '../auth/Auth';
let serverConfig = require('../../config/Config').server;
let moment = require('moment');

let kitchenArray;
let hallwayArray;
let basementArray;
let laundryArray;

let latestKitchen;
let latestHallway;
let latestBasement;
let latestLaundry;
let latestDate;

class HueSensors extends Component {

    constructor(props){
        super(props);

        this.state = {

            isLoaded: false,
        };
        this.changeLoginState = this.changeLoginState.bind(this);
    }

    changeLoginState() {
        this.props.changeLoginState();

    }

    fetchValues () {

        kitchenArray = [];
        hallwayArray = [];
        basementArray = [];
        laundryArray = [];

        let day = 1000 * 60 * 60 * 24;
        let d = Date.now() - day;

        let newD = new Date(d);
        newD = newD.toISOString();

        let urlQueary = serverConfig.url + '/properties/hue/search' + '?since=' + newD;

        return axios({
            method: 'get',
            url: urlQueary,
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                let res = response.data.data;

                console.log(res);
                let data = res.filter((element, index) => {
                    return index % 5 === 0;
                });

                data.forEach((i) => {

                    let date = new Date(i.date);
                    let label = addZero(date.getHours()) + ':' + addZero(date.getMinutes());

                    let tempKitchen = {
                       label: label,
                        value: i.Kitchen.temperature.toFixed(1),
                    };
                    let tempHallway = {
                        label: label,
                        value: i.Hallway.temperature.toFixed(1),
                    };
                    let tempBasement = {
                        label: label,
                        value: i.Basement.temperature.toFixed(1),
                    };
                    let tempLaundry = {
                        label: label,
                        value: i.Laundry.temperature.toFixed(1),
                    };

                    kitchenArray.push(tempKitchen);
                    hallwayArray.push(tempHallway);
                    basementArray.push(tempBasement);
                    laundryArray.push(tempLaundry);

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

        latestKitchen = {};
        latestHallway = {};
        latestBasement = {};
        latestLaundry = {};
        latestDate = '';

        return axios({
            method: 'get',
            url: serverConfig.url + '/properties/hue/latest',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                latestDate = response.data.date;
                latestKitchen = response.data.Kitchen;
                latestHallway = response.data.Hallway;
                latestBasement = response.data.Basement;
                latestLaundry = response.data.Laundry;
            })
            .then(() => {
                this.setState({
                    isLoaded: true,
                })
            })
            .catch((error) => {
                throw new Error(error);
            })
    }

    componentDidMount() {

        this.fetchValues();
    }

    render() {

        const isLoggedIn = this.props.state.signedIn;

        return (
                <div className="HueSensors">
                    {isLoggedIn ?  (
                        <div>
                            {this.state.isLoaded ? (
                                <div className="Chart-body">
                                    <div className="Chart">
                                        <div className="Chart-inner">
                                            <Charts data={kitchenArray} type={'Kitchen'}/>
                                            <div className="Chart-text">
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Latest temperature: ' + latestKitchen.temperature.toFixed(1) + '°C'}</p>
                                                    <p className="Chart-text-since">{'Updated ' + moment(latestDate).fromNow()}</p>
                                                </div>
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Last movement: ' + moment(latestKitchen.lastMovement).fromNow()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Chart">
                                        <div className="Chart-inner">
                                            <Charts data={hallwayArray} type={'Hallway'}/>
                                            <div className="Chart-text">
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Latest temperature: ' + latestHallway.temperature.toFixed(1) + '°C'}</p>
                                                    <p className="Chart-text-since">{'Updated ' + moment(latestDate).fromNow()}</p>
                                                </div>
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Last movement: ' + moment(latestHallway.lastMovement).fromNow()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Chart">
                                        <div className="Chart-inner">
                                            <Charts data={basementArray} type={'Basement'}/>
                                            <div className="Chart-text">
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Latest temperature: ' + latestBasement.temperature.toFixed(1) + '°C'}</p>
                                                    <p className="Chart-text-since">{'Updated ' + moment(latestDate).fromNow()}</p>
                                                </div>
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Last movement: ' + moment(latestBasement.lastMovement).fromNow()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Chart">
                                        <div className="Chart-inner">
                                            <Charts data={laundryArray} type={'Laundry'}/>
                                            <div className="Chart-text">
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Latest temperature: ' + latestLaundry.temperature.toFixed(1) + '°C'}</p>
                                                    <p className="Chart-text-since">{'Updated ' + moment(latestDate).fromNow()}</p>
                                                </div>
                                                <div className="Chart-inner-text">
                                                    <p className="Chart-text-value">{'Last movement: ' + moment(latestLaundry.lastMovement).fromNow()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <CircularProgress style={style.spinner}/>
                            )}
                        </div>
                    ) : (
                        <Auth changeLoginState={this.changeLoginState}/>
                    )}

                </div>
        );
    }
}

export default HueSensors;

const style = {
    spinner: {

        margin: 'auto',
    }
};