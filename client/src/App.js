import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './style/App.css';
import { slide as Menu } from 'react-burger-menu';
import WebSocket from 'react-websocket';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import {cyan500, grey800, grey400} from 'material-ui/styles/colors';

import Robot from './component/robot/Robot';
import RpiSensors from './component/sensors/RpiSensors';
import HueSensors from './component/sensors/HueSensors';
let serverConfig = require('./config/Config').server;


class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            menuOpen: false,
            signedIn: true,
        };
        //this.isSignedIn = this.isSignedIn.bind(this);
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})
    }

    closeMenu () {
        this.setState({menuOpen: false})
    }

    toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);
    }

  render() {

        console.log('Render App');
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router>
              <div className="App">
                  <Menu
                        isOpen={this.state.menuOpen}
                        onStateChange={(state) => this.handleStateChange(state)}>
                      <FlatButton
                          label="RPi Sensors"
                          labelStyle={style.button}
                          style={style.button}
                          secondary={true}
                          onClick={() => this.closeMenu()}
                          containerElement={ <Link to={'/'}/>}
                          />
                      <FlatButton
                          label="Hue Sensors"
                          labelStyle={style.button}
                          style={style.button}
                          secondary={true}
                          onClick={() => this.closeMenu()}
                          containerElement={ <Link to={'/sensors/hue'}/>}
                      />
                      <FlatButton
                          label="Robot"
                          labelStyle={style.button}
                          style={style.button}
                          secondary={true}
                          onClick={() => this.closeMenu()}
                          containerElement={ <Link to={'/robot'}/>}
                      />
                  </Menu>
                <header className="App-header">
                  <h1 className="App-title">RPi Robot</h1>
                </header>

                  <div className="Body">
                      <Route path="/robot" component={Robot}/>
                      <Route path="/" exact={true} component={RpiSensors}/>
                      <Route path="/sensors/hue" component={HueSensors}/>

                  </div>
                  <WebSocket url={serverConfig.wsUrl}
                             onMessage={this.handleData.bind(this)}/>
              </div>
            </Router>
        </MuiThemeProvider>
    );
  }
}

export default App;

const muiTheme = getMuiTheme({
    toolbar: {
        backgroundColor: grey800,
        accent1Color: grey800,
        height: 60,
        titleFontSize: 20,
    },
});

const style = {
    labelStyle: {
        fontSize: 22,
        color: 'white',
    },
    iconStyle: {
        fontSize: 22,
        color: 'white',
        opacity: 1,
    },
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
    },
    menuItemStyle: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        color: grey400,
    },
    selectedMenuItemStyle: {
        color: grey800,
    },
    spinner: {

        margin: 'auto',
    },
    snackBar: {
        backgroundColor: grey800,
        textAlign: 'center',
    },
    button: {
        color: '#fff',
        textAlign: 'left',
        fontSize: '105%',
        marginBottom: 5,
    }

};
