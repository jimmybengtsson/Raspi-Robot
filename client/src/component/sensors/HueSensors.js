import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Sensors.css';

class HueSensors extends Component {
    render() {
        return (
            <Router>
                <div className="HueSensors">
                    <p>Hue Sensors</p>

                </div>
            </Router>
        );
    }
}

export default HueSensors;