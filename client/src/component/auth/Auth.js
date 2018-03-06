import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../style/Auth.css';

class Auth extends Component {
    render() {
        return (
            <Router>
                <div className="Auth">
                    <p>Login</p>

                </div>
            </Router>
        );
    }
}

export default Auth;