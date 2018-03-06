import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './style/App.css';
import { slide as Menu } from 'react-burger-menu';


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

  render() {
    return (
        <Router>
          <div className="App">
              <Menu className={ "menu" }
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}>
                  <button onClick={() => {
                      this.setState({
                          page: 'rates',
                      });
                      this.closeMenu();
                  }}>Rates</button>
                  <button onClick={() => {
                      this.setState({
                          page: 'wallet',
                      });
                      this.closeMenu();
                  }}>Wallets</button>
              </Menu>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">RPi Robot</h1>
            </header>

          </div>
        </Router>
    );
  }
}

export default App;
