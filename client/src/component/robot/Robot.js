import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';

class Robot extends Component {
    render() {
        return (
            <Router>
                <div className="Robot">
                    <p>Robot</p>

                </div>
            </Router>
        );
    }
}

export default Robot;