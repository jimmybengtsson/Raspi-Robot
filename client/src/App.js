import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './style/App.css';
import { slide as Menu } from 'react-burger-menu';
import Websocket from 'react-websocket';

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
        <Router>
          <div className="App">
              <Menu className={ "menu" }
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}>
                  <Link to={'/'}
                        onClick={() => {
                            this.closeMenu();
                        }}>
                      RPi Sensors
                  </Link>
                  <Link to={'/sensors/hue'}
                        onClick={() => {
                            this.closeMenu();
                        }}>
                      Hue Sensors
                  </Link>
                  <Link to={'/robot'}
                        onClick={() => {
                            this.closeMenu();
                        }}>
                      Robot
                  </Link>
              </Menu>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">RPi Robot</h1>
            </header>

              <Route path="/robot" component={Robot}/>
              <Route path="/" exact={true} component={RpiSensors}/>
              <Route path="/sensors/hue" component={HueSensors}/>

              <Websocket url={serverConfig.wsUrl}
                         onMessage={this.handleData.bind(this)}/>
          </div>
        </Router>
    );
  }
}

export default App;
