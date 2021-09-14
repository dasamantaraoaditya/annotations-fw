import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import * as url from "url";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }

    login() {
        //do login
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }
        fetch("/login", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data.username)
                            this.props.setLoggedInUser(data)
                    });
                    const {history} = this.props;
                    if (history) history.push('/upload');
                } else if (response.status === 401) {
                    response.json().then(data => {
                        if (data.errorMessage)
                            this.setState({
                                "errorMessage": data.errorMessage
                            });
                    });
                }
            });
    }


    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>User Name</td>
                        <td><input name="username" type="text" placeholder="Enter your user name"
                                   value={this.state.username} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input name="password" type="password" placeholder="Enter your password"
                                   value={this.state.password} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td><Link to="/">Sign Up ?</Link></td>
                        <td><input type="button" value="Login" onClick={this.login}/></td>
                    </tr>
                    </tbody>
                </table>
                <label>{this.state.errorMessage}</label>
            </div>
        );
    }
}

export default withRouter(Login);