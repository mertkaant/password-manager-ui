import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {



    // componentDidMount() {
    //     // POST request using axios with set headers
    //     const article = { title: 'React POST Request Example' };
    //     const headers = { 
    //         'Authorization': 'Bearer my-token',
    //         'My-Custom-Header': 'foobar'
    //     };
    //     axios.post('https://reqres.in/api/articles', article, { headers })
    //         .then(response => this.setState({ articleId: response.data.id }));
    // }


    // login = () => {
    //     const data = {
    //         email: this.email,
    //         password: this.password
    //     };

    //     const res = axios.post('login', data, {
    //         'Authorization': 'Bearer' + res.data.token,
    //     }).then(response => {
    //         this.setState({
    //             loggedIn: true,
    //             message: response.data.message,
    //             cls: 'success'
    //         });
    //         this.props.setUser(response.data.user);
    //     }).catch(err => {
    //         this.setState({
    //             message: err.response.data.message,
    //             cls: 'danger'
    //         })
    //     })
    // }

    state = {};
    handleSubmit = e => {

        e.preventDefault();

        const data = {
            email: this.email,
            password: this.password
        };

        axios.post('login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                this.setState({
                    loggedIn: true,
                    message: res.data.message,
                    cls: 'success'
                });
                this.props.setUser(res.data.user);
            })
            .catch(
                err => {
                    this.setState({
                        message: err.response.data.message,
                        cls: 'danger'
                    })
                })
    };

    render() {
        if (this.state.loggedIn) {
            return <Redirect to={'/'} />
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
                <h3>Login</h3>
                {message}
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="E-mail"
                        onChange={e => this.email = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => this.password = e.target.value} />
                </div>

                <button className="btn btn-primary btn-block">Login</button>
                <p className="forgot-password text-right">
                    <Link className="forgot"to={'/forgot'}>Forgot Password?</Link>
                </p>

            </form>
        )
    }
}