import React, { Component } from 'react';

class MyForm extends Component {
    state = {
        form: { platform: "", email: "", password: "", description: "", isEdit: false },
        btnName: "Save",
        btnClass: "ui primary button submit-button"
    };

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.password)) {
            this.setState({
                form: { ...this.props.password, isEdit: true },
                btnName: "Update",
                btnClass: "ui orange button submit-button"
            });
            //console.log('update');
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    };

    onFormSubmit = event => {
        event.preventDefault();

        if (this.formValidation()) {
            this.props.onFormSubmit(this.state.form);
        }

        this.setState({
            btnName: "Save",
            btnClass: "ui primary button submit-button"
        });

        this.clearFormFields();
    };

    formValidation = () => {
        if (document.getElementsByName("platform")[0].value === "") {
            alert('*Platform field is required*')
            return false;
        }

        if (document.getElementsByName("email")[0].value === "") {
            alert('*E-mail field is required*')
            return false;
        }

        if (document.getElementsByName("password")[0].value === "") {
            alert('*Password field is required*')
            return false;
        }

        if (document.getElementsByName("description")[0].value === "") {
            alert('*Description field is required*')
            return false;
        }
        return true;
    };

    clearFormFields = () => {
        // console.log("clear");
        // change form state
        this.setState({
            form: { platform: "", email: "", password: "", description: "", isEdit: false }
        });

        // clear form fields
        document.querySelector(".form").reset();
    };

    render() {
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Platform</label>
                        <input
                            type="text"
                            name="platform"
                            placeholder="Platform"
                            onChange={this.handleChange}
                            value={this.state.form.platform}
                        />
                    </div>
                    <div className="four wide field">
                        <label>E-mail</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="mert@gmail.com"
                            onChange={this.handleChange}
                            value={this.state.form.email}
                        />
                    </div>
                    <div className="four wide field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.form.password}
                        />
                    </div>
                    <div className="four wide field">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.handleChange}
                            value={this.state.form.description}
                        />
                    </div>
                    <div className="four wide field">
                        <button className={this.state.btnClass} onClick={this.onFormSubmit}>
                            {this.state.btnName}
                        </button>

                    </div>
                </div>

            </form>

        );
    }
}

export default MyForm;