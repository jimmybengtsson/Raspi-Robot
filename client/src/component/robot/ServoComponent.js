import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';
import axios from "axios/index";

let serverConfig = require('../../config/Config').server;

class Servo extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
        };

    }

    servoLeft () {

        console.log('Motor left');
        axios.get(serverConfig.url + '/actions/camera/left')
            .then((response) => {

                console.log(response);


            });
    }

    servoRight () {

        console.log('Motor right');
        axios.get(serverConfig.url + '/actions/camera/right')
            .then((response) => {

                console.log(response);
            });
    }

    servoCenter () {

        console.log('Motor stop');
        axios.get(serverConfig.url + '/actions/camera/center')
            .then((response) => {

                console.log(response);
            });

    }

    render() {

        console.log(serverConfig.url);
        return (
            <Router>
                <div className="Motor">

                    <button className="Camera-center"
                            onClick={() => {
                                this.servoCenter()
                            }}>
                    </button>
                    <button className="Camera-left"
                            onClick={() => {
                                this.servoLeft();
                            }}>
                    </button>
                    <button className="Camera-right"
                            onMouseDown={() => {
                                this.servoRight()
                            }}>
                    </button>

                </div>
            </Router>
        );
    }
}

export default Servo;