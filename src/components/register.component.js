import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Register extends Component {

    state = {};

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.confirmPassword
        };
        console.log(data);

        axios.post('register', data).then(
            res => {
                this.setState({
                    isRegistered: true
                })
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.message,
                    cls: 'danger'
                })
            }
        )
    };
    

    render() {
        if (this.state.isRegistered) {
            return <Redirect to={'/login'} />
        }

        let message = '';

        if (this.state.message) {
            const cls = 'alert alert-' + this.state.cls;
            message = (
                <div className={cls} role="alert">
                    {this.state.message}
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {message}
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" 
                    onChange={e => this.firstName = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name"
                    onChange={e => this.lastName = e.target.value} />
                </div>

                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="E-mail" 
                    onChange={e => this.email = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" 
                    onChange={e => this.password = e.target.value}/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password" 
                    onChange={e => this.confirmPassword = e.target.value}/>
                </div>

                <button className="btn btn-primary btn-block">Sign Up</button>

            </form>
        )
    }
}