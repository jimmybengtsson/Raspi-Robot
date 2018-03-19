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

        console.log('Camera left');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/camera/left',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);


            });
    }

    servoRight () {

        console.log('Camera right');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/camera/right',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);
            });
    }

    servoCenter () {

        console.log('Camera center');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/camera/center',
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