import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';
import axios from "axios/index";
import FlatButton from 'material-ui/FlatButton';

let serverConfig = require('../../config/Config').server;

class Led extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
        };

    }

    ledOn () {

        console.log('Led on');
        axios.get(serverConfig.url + '/actions/led/on')
            .then((response) => {

                console.log(response);


            });
    }

    ledOff () {

        console.log('Led off');
        axios.get(serverConfig.url + '/actions/led/off')
            .then((response) => {

                console.log(response);
            });
    }

    ledFlash () {

        console.log('Led flash');
        axios.get(serverConfig.url + '/actions/led/blink')
            .then((response) => {

                console.log(response);
            });

    }

    hueOn () {

        console.log('Hue on');
        axios.get(serverConfig.url + '/actions/hue/on')
            .then((response) => {

                console.log(response);


            });
    }

    hueOff () {

        console.log('Hue off');
        axios.get(serverConfig.url + '/actions/hue/off')
            .then((response) => {

                console.log(response);
            });
    }

    hueFlash () {

        console.log('Hue flash');
        axios.get(serverConfig.url + '/actions/hue/blink')
            .then((response) => {

                console.log(response);
            });

    }

    render() {

        console.log(serverConfig.url);
        return (
            <Router>
                <div className="Led">
                    <p>Led:</p>
                    <FlatButton
                        label="On"
                        onClick={() => this.ledOn()}
                    />
                    <FlatButton
                        label="Off"
                        onClick={() => this.ledOff()}
                    />
                    <FlatButton
                        label="Flash"
                        onClick={() => this.ledFlash()}
                    />
                    <p>Hue:</p>
                    <FlatButton
                        label="On"
                        onClick={() => this.hueOn()}
                    />
                    <FlatButton
                        label="Off"
                        onClick={() => this.hueOff()}
                    />
                    <FlatButton
                        label="Flash"
                        onClick={() => this.hueFlash()}
                    />

                </div>
            </Router>
        );
    }
}

export default Led;