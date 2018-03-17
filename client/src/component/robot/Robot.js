import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';

import Motor from './MotorComponent';
import Servo from './ServoComponent';
import Stream from './Stream';
import Led from './LedComponent';

class Robot extends Component {
    render() {
        return (
            <Router>
                <div className="Robot">
                    <Stream/>
                    <Led/>
                    <div className="Controller">
                        <Motor/>
                        <Servo/>
                    </div>

                </div>
            </Router>
        );
    }
}

export default Robot;