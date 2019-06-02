import React from 'react'
import { Route, Redirect } from 'react-router'
import './Form.css'

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            tryPassword: "",
            error: {},
            loggedIn: false
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        try {
            if (this.state.password != this.state.tryPassword) {
                this.setState({
                    error: {
                        statusCode: 1,
                        message: "Passwords must match"
                    }
                });
                return;
            }
            let body = JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            });
            console.log(body);
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                body
            };
            fetch(`https://localhost:44326/api/users/signup`, options)
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem("userId", data.id);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("userinfo", JSON.stringify(data.userInfo));
                        this.setState({ logged: true })

                    } else if (data.statusCode && data.message) {
                        this.setState({ error: data });
                    }
                })
                .catch(error => {
                    this.handleError(666, "Registration error");
                    console.log(error);
                });
        }
        catch (e) {
            this.handleError(666, e.message);
            console.log('Ошибка');
        }
    }

    onChange(e) {
        if (e.target.type === "email")
            this.setState({
                email: e.target.value
            })
        else if (e.target.type === "password") {
            if (e.target.name === "first_password") {
                this.setState({
                    password: e.target.value
                });
            } else {
                this.setState({
                    tryPassword: e.target.value
                });
            }
        }
            
    }

    render() {
        return this.state.loggedIn ?
                <Redirect to='/' />
                :
                (
                <form className="box" onSubmit={this.handleSubmit}>
                    <h1>Sign up</h1>
                    <input type="email" value={this.state.email} onChange={this.onChange} placeholder="example@mail.com" required />
                    <input type="password" name="first_password" value={this.state.password} onChange={this.onChange} placeholder="password" required />
                    <input type="password" name="second_password" value={this.state.tryPassword} onChange={this.onChange} placeholder="repeat password" />
                    <div className="error" hidden={!this.state.error.message}>
                        <p>{this.state.error.statusCode}. {this.state.error.message}</p>
                    </div>
                    <button type="submit">Sign up</button>
                </form>
            );
    }
}