import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    };

    render() {
        let buttons;
        if (this.props.user) {
            buttons = (
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link" to={'/'}
                                onClick={this.handleLogout}>Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        } else {
            buttons = (
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/login'}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/register'}>Sign up</Link>
                        </li>
                    </ul>
                </div>
            )
        }


        return (
            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>Home</Link>
                    {buttons}
                </div>
            </nav>
        )
    }
}