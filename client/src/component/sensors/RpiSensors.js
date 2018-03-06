import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Sensors.css';

class RpiSensors extends Component {
    render() {
        return (
            <Router>
                <div className="RpiSensors">
                    <p>RPi Sensors</p>

                </div>
            </Router>
        );
    }
}

export default RpiSensors;