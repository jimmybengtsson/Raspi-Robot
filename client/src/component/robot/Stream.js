import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';
import Motor from './MotorComponent';
import Servo from './ServoComponent';

import ReactHLS from 'react-hls';
import axios from "axios/index";

let serverConfig = require('../../config/Config').server;

class Stream extends Component {


    componentDidMount() {
        axios.get(serverConfig.url + '/actions/camera/stream')
            .then((response) => {

                console.log(response);

            });
    }

    render() {

    console.log(serverConfig.url + '/streamFiles/livestream.m3u8');
        return (

                   <ReactHLS url={serverConfig.url + '/streamFiles/livestream.m3u8'}
                             autoplay={true}

                   />
        );
    }
}

export default Stream;