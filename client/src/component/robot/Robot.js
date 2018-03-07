import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';

import Motor from './MotorComponent';
import Servo from './ServoComponent';
import Stream from './Stream';

class Robot extends Component {
    render() {
        return (
            <Router>
                <div className="Robot">
                    <p>Robot</p>

                    <Stream/>
                    <Motor/>
                    <Servo/>

                </div>
            </Router>
        );
    }
}

export default Robot;