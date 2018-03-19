import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Auth.css';
import Dialog from 'material-ui/Dialog';
import axios from "axios/index";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

let serverConfig = require('../../config/Config').server;

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
            loginModal: false,
            registerModal: false,
            loginUsername: 'Username',
            loginPassword: 'Password',
            registerUsername: 'Username',
            registerPassword: 'Password',
        };

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    closeLoginDialog = () => {
        this.setState({
            loginModal: false
        });
    };

    openLoginDialog = () => {
        this.setState({
            loginModal: true
        });
    };

    closeRegisterDialog = () => {
        this.setState({
            registerModal: false
        });
    };

    openRegisterDialog = () => {
        this.setState({
            registerModal: true
        });
    };

    handleLoginUsername = (event) => {
        this.setState({
            loginUsername: event.target.value,
        });
    };

    handleLoginPassword = (event) => {
        this.setState({
            loginPassword: event.target.value,
        });
    };

    handleRegisterUsername = (event) => {
        this.setState({
            registerUsername: event.target.value,
        });
    };
    handleRegisterPassword = (event) => {
        this.setState({
            registerPassword: event.target.value,
        });
    };

    changeLoginState() {
        this.props.changeLoginState();
    }

    handleLoginSubmit() {

        this.setState({
            loginModal: false
        });

        let data = {
            userName: this.state.loginUsername,
            password: this.state.loginPassword,
        };

        axios({
            method: 'post',
            url: serverConfig.url + '/login',
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => {

                if(response.data.data.auth === true) {

                    localStorage.setItem('token', JSON.stringify(response.data.data.token));
                    this.changeLoginState(true);
                }

            });
    }


    handleRegisterSubmit() {

        this.setState({
            registerModal: false
        });

        let data = {
            userName: this.state.registerUsername,
            password: this.state.registerPassword,
        };

        axios({
            method: 'post',
            url: serverConfig.url + '/register',
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => {

                if(response.data.data.auth === true) {

                    localStorage.setItem('token', JSON.stringify(response.data.data.token));
                    this.changeLoginState(true);
                }

            });
    }


    render() {

        const loginActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeLoginDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleLoginSubmit}
            />,
        ];

        const registerActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.closeRegisterDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleRegisterSubmit}
            />,
        ];

        return (
                <div className="Auth">
                    <p className="Title">You have to be signed in to see this!</p>
                    <div className="Buttons-div">
                        <RaisedButton
                            label="Login"
                            primary={true}
                            onClick={() => this.openLoginDialog()}
                            style={{ margin: 20 }}
                        />
                        <RaisedButton
                            label="Register"
                            primary={true}
                            onClick={() => this.openRegisterDialog()}
                            style={{ margin: 20 }}
                        />
                    </div>
                    <Dialog
                        contentStyle={{textAlign: 'center'}}
                        title="Please enter username and password!"
                        modal={false}
                        open={this.state.loginModal}
                        onRequestClose={this.closeLoginDialog}
                    >
                        <div className="Inner-dialog">
                            <TextField
                                value={this.state.loginUsername}
                                onChange={this.handleLoginUsername}
                                id={'login-username'}
                            />
                            <TextField
                                value={this.state.loginPassword}
                                onChange={this.handleLoginPassword}
                                id={'login-password'}
                            />
                            <div>
                                {loginActions}
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        contentStyle={{textAlign: 'center'}}
                        title="Please enter username and password!"
                        modal={false}
                        open={this.state.registerModal}
                        onRequestClose={this.closeRegisterDialog}
                    >
                        <div className="Inner-dialog">
                            <TextField
                                value={this.state.registerUsername}
                                onChange={this.handleRegisterUsername}
                                id={'register-username'}
                            />
                            <TextField
                                value={this.state.registerPassword}
                                onChange={this.handleRegisterPassword}
                                id={'register-password'}
                            />
                            <div>
                                {registerActions}
                            </div>
                        </div>
                    </Dialog>

                    </div>
        );
    }
}

export default Auth;