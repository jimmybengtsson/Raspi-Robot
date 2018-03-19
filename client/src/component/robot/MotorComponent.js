import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';
import axios from "axios/index";

let serverConfig = require('../../config/Config').server;

class Motor extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
        };

    }

    motorForward () {

        console.log('Motor forward');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/motor/forward',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

            console.log(response);

        });
    }

    motorReverse () {

        console.log('Motor reverse');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/motor/reverse',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);

            });
    }

    motorLeft () {

        console.log('Motor left');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/motor/left',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);


            });
    }

    motorRight () {

        console.log('Motor right');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/motor/right',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);
            });
    }

    motorStop () {

        console.log('Motor stop');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/motor/stop',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

            console.log(response);
        });

    }

    render() {

        console.log(serverConfig.url);
        return (
            <Router>
                <div className="Motor">

                    <button className="Forward"
                        onMouseDown={() => {
                            this.motorForward();
                        }}
                        onMouseUp={() => {
                            this.motorStop();
                        }}>
                    </button>
                    <button className="Reverse"
                            onMouseDown={() => {
                                this.motorReverse();
                            }}
                            onMouseUp={() => {
                                this.motorStop();
                            }}>
                    </button>
                    <button className="Left"
                            onMouseDown={() => {
                                this.motorLeft();
                            }}
                            onMouseUp={() => {
                                this.motorStop();
                            }}>
                    </button>
                    <button className="Right"
                            onMouseDown={() => {
                                this.motorRight();
                            }}
                            onMouseUp={() => {
                                this.motorStop();
                            }}>
                    </button>

                </div>
            </Router>
        );
    }
}

export default Motor;