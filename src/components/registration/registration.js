import React from 'react';
import {Link} from "react-router-dom";

class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            project: "",
            registerButton: false,
            errorMessage: "",
            confirmPassword: ""
        };
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    handleConfirmPassword() {
        // this.setState({
        //     registerButton: !(this.state.confirmPassword === this.state.password)
        // });

    }

    handleChange({target}) {
        this.setState(state => ({...state, [target.name]: target.value}), this.handleConfirmPassword());
    }

    register() {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                project: this.state.project
            })
        }
        fetch("/register", requestOptions)
            .then(response => {
                    if (response.status == 200) {
                        const {history} = this.props;
                        if (history) history.push('/login');
                    } else if (response.status == 409) {
                        response.json().then(data => {
                            if (data.errorMessage)
                                this.setState({
                                    "errorMessage": data.errorMessage
                                });
                        });
                    }
                }
            );
    }

    render() {
        return (
            <div>
                <div>Registration</div>
                <table>
                    <tbody>
                    <tr>
                        <td>UserId</td>
                        <td><input type="text" name="username" placeholder="Enter your username"
                                   value={this.state.username} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" name="password" placeholder="Enter your password"
                                   value={this.state.password} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Confirm Password</td>
                        <td><input type="password" name="confirmPassword" placeholder="Confirm your password ..."
                                   value={this.state.confirmPassword} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Project Name</td>
                        <td><input type="text" name="project" placeholder="Enter your project name"
                                   value={this.state.project} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td><Link to='/login'>Login ?</Link></td>
                        <td><input type="submit" value="Sign Up" disabled={this.state.registerButton}
                                   onClick={this.register}/></td>
                    </tr>
                    <label>{this.state.errorMessage}</label>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Registration;