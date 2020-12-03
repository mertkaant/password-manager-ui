import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export class Reset extends Component {

    state = {};

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            token: this.props.match.params.id,
            password: this.password,
            password_confirm: this.password_confirm
        };

        axios.post('reset', data).then(
            res => {
                this.setState({
                    message: res.data.message,
                    cls: 'success'
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
        let message = '';

        if (this.state.message) {
            const cls = 'alert alert-' + this.state.cls;
            message = (
                <div className={cls} role="alert">
                    {this.state.message}
                </div>
            )
        }

        if(this.state.reset) {
            return <Redirect to={'/login'} />
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {message}
                <h3>Reset Password</h3>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => this.password = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Password Confirm</label>
                    <input type="password" className="form-control" placeholder="Password Confirm"
                        onChange={e => this.password_confirm = e.target.value} />
                </div>

                <button className="btn btn-primary btn-block">Submit</button>
            </form>
        )
    }
}

export default Reset;