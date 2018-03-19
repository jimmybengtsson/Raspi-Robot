import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';

import Motor from './MotorComponent';
import Servo from './ServoComponent';
import Stream from './Stream';
import Led from './LedComponent';
import Auth from '../auth/Auth';

class Robot extends Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.changeLoginState = this.changeLoginState.bind(this);
    }

    changeLoginState() {
        this.props.changeLoginState();

    }

    render() {

        const isLoggedIn = this.props.state.signedIn;

        return (
                <div className="Robot">
                    {isLoggedIn ?  (
                        <div>
                            <div className="Stream">
                                <Motor state={this.props.state}/>
                                <Stream/>
                                <Servo state={this.props.state}/>
                            </div>
                            <Led state={this.props.state}/>
                        </div>
                    ) : (
                        <Auth changeLoginState={this.changeLoginState}/>
                    )}

                </div>
        );
    }
}

export default Robot;