import React, { Component } from 'react';

class Password extends Component {

    onEdit = () => {
        this.props.onEdit(this.props.password);
    };

    onDelete = () => {
        this.props.onDelete(this.props.password.id);
    };

    render() {
        const { id, platform, email, password, description } = this.props.password;
        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{platform}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>{description}</td>
                <td>
                    <button className="mini ui button" onClick={this.onEdit}>Edit</button>
                    <button className="mini ui button" onClick={this.onDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}


export default Password;