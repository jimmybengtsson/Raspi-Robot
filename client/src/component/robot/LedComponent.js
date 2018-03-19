import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Robot.css';
import axios from "axios/index";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/led/on',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);


            });
    }

    ledOff () {

        console.log('Led off');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/led/off',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);
            });
    }

    ledFlash () {

        console.log('Led flash');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/led/blink',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);
            });

    }

    hueOn () {

        console.log('Hue on');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/hue/on',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);


            });
    }

    hueOff () {

        console.log('Hue off');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/hue/off',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);
            });
    }

    hueFlash () {

        console.log('Hue flash');
        axios({
            method: 'get',
            url: serverConfig.url + '/actions/hue/blink',
            headers: {'x-access-token': this.props.state.token}
        })
            .then((response) => {

                console.log(response);
            });

    }

    render() {

        console.log(serverConfig.url);
        return (
                <div className="Led">
                    <div className="Led-links">
                        <p className="Led-title">Led:</p>
                        <RaisedButton
                            label="On"
                            onClick={() => this.ledOn()}
                            primary={true}
                            style={style}
                        />
                        <RaisedButton
                            label="Off"
                            onClick={() => this.ledOff()}
                            primary={true}
                            style={style}
                        />
                        <RaisedButton
                            label="Flash"
                            onClick={() => this.ledFlash()}
                            primary={true}
                            style={style}
                        />
                    </div>
                    <div className="Hue-links">
                        <p className="Led-title">Hue:</p>
                        <RaisedButton
                            label="On"
                            onClick={() => this.hueOn()}
                            primary={true}
                            style={style}
                        />
                        <RaisedButton
                            label="Off"
                            onClick={() => this.hueOff()}
                            primary={true}
                            style={style}
                        />
                        <RaisedButton
                            label="Flash"
                            onClick={() => this.hueFlash()}
                            primary={true}
                            style={style}
                        />
                    </div>

                </div>
        );
    }
}

export default Led;

const style = {
    margin: 2,
};