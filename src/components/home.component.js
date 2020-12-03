import React, { Component } from 'react';
import axios from 'axios';
import MyForm from './myform.component';
import PasswordList from './passwordlist.component';
import Loader from './loader.component';

export default class Home extends Component {

    state = {
        passwords: [],
        password: {},
        loader: false,
        url: "passwords",
    };

    getPasswords = async () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        this.setState({ loader: true });
        const passwords = await axios.get(this.state.url,);
        this.setState({ passwords: passwords.data, loader: false });
    };

    deletePassword = async id => {
        this.setState({ loader: true });
        await axios.delete(`${this.state.url}/${id}`);

        this.getPasswords();
    };

    createPassword = async data => {
        this.setState({ loader: true });

        await axios.post(this.state.url, {
            platform: data.platform,
            email: data.email,
            password: data.password,
            description: data.description
        });

        this.getPasswords();
    };


    editPassword = async data => {
        this.setState({ password: {}, loader: true });

        await axios.put(`${this.state.url}/${data.id}`, {
            platform: data.platform,
            email: data.email,
            password: data.password,
            description: data.description
        });
        this.getPasswords();
    };


    componentDidMount() {
        this.getPasswords();
        //localStorage.getItem()
    };

    onDelete = id => {
        //console.log('app',id)
        this.deletePassword(id);
    };

    onEdit = data => {
        //console.log('app',data)
        this.setState({ password: data });
    };

    onFormSubmit = data => {
        //console.log('app', data);

        if (data.isEdit) {
            this.editPassword(data);
        }
        else {
            this.createPassword(data);
        }
    };

    render() {

        if (this.props.user) {
            return (
                <div>
                    <div className="ui main container">
                        <MyForm
                            onFormSubmit={this.onFormSubmit}
                            password={this.state.password}

                        />
                        {this.state.loader ? <Loader /> : ""}
                        <PasswordList
                            passwords={this.state.passwords}
                            onDelete={this.onDelete}
                            onEdit={this.onEdit}
                        />
                    </div>
                </div>

            )
        } else {
            return (
                <h2 className="not-loggedin" >You are not logged in</h2>
            )

        }


    }
}