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
        axios.get(serverConfig.url + '/actions/motor/forward')
            .then((response) => {

            console.log(response);

        });
    }

    motorReverse () {

        console.log('Motor reverse');
        axios.get(serverConfig.url + '/actions/motor/reverse')
            .then((response) => {

                console.log(response);

            });
    }

    motorLeft () {

        console.log('Motor left');
        axios.get(serverConfig.url + '/actions/motor/left')
            .then((response) => {

                console.log(response);


            });
    }

    motorRight () {

        console.log('Motor right');
        axios.get(serverConfig.url + '/actions/motor/right')
            .then((response) => {

                console.log(response);
            });
    }

    motorStop () {

        console.log('Motor stop');
        axios.get(serverConfig.url + '/actions/motor/stop')
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