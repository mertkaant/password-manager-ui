import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home.component';
import Nav from './components/nav.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Forgot from './components/forgot.component';
import Reset from './components/reset.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';


export default class App extends Component {

    state = {};

    componentDidMount = () => {

        axios.get('user').then(
            res => {
                this.setUser(res.data);
            },
            err => {
                console.log(err);
            }
        )
    };

    setUser = user => {
        this.setState({
            user: user
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav user={this.state.user} setUser={this.setUser} />
                    <div className="auth-wrapper">
                        {this.state.user ? (
                            <div className="password-list">
                                <Switch>
                                    <Route exact path="/" component={() => <Home user={this.state.user} />} />
                                </Switch>
                            </div>
                        ) : (
                                <div className="auth-inner">
                                    <Switch>
                                        <Route exact path="/" component={() => <Home user={null} />} />
                                        <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
                                        <Route exact path="/register" component={Register} />
                                        <Route exact path="/forgot" component={Forgot} />
                                        <Route exact path="/reset/:id" component={Reset} />
                                    </Switch>
                                </div>
                            )}








                    </div>
                </div>
            </BrowserRouter>

        );
    }
}