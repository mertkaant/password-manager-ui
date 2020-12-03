import React, { Component } from 'react';
import Password from "./password.component";

class PasswordList extends Component {
    onDelete = id => {
        this.props.onDelete(id);
        //console.log("password list", id);
    };

    onEdit = data => {
        this.props.onEdit(data);
    };
    render() {
        const passwords = this.props.passwords;
        return (
            <div className="data">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th style={{ width: "50px", textAlign: "center" }}>#</th>
                            <th>Platform</th>
                            <th>E-Mail</th>
                            <th>Password</th>
                            <th>Description</th>
                            <th style={{ width: "148px" }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {passwords.map(password => {
                            return (
                                <Password
                                    key={password.id}
                                    password={password}
                                    onDelete={this.onDelete}
                                    onEdit={this.onEdit}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default PasswordList;