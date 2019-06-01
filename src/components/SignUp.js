import React from 'react'
import {Route, Redirect } from 'react-router'

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            tryPassword: "",
            error: false,
            logged: false
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        try {
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
            fetch(`https://reading-organizer.azurewebsites.net/api/users/signup`, options)
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem("userId", data.id);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("userinfo", data.userInfo);
                        this.setState({ logged: true })

                    } else if (data.statusCode && data.message) {
                        this.handleError(data.statusCode, data.message);
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

    handleError(statusCode, message) {
        localStorage.setItem("statusCode", statusCode);
        localStorage.setItem("message", message);
        this.setState({ error: true });
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
        return this.state.error ?
            (<Redirect to='/error' />)
            :
            this.state.logged ?
                (<Redirect to='/' />)
                :
            (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <form className="col-12" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-text text-muted">Email</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.onChange} placeholder="example@mail.com" required />
                        </div>
                        <div className="form-group">
                            <label className="form-text text-muted">Password</label>
                            <input type="password" className="form-control" name="first_password" value={this.state.password} onChange={this.onChange} placeholder="*******" required />
                        </div>
                        <div className="form-group">
                            <label className="form-text text-muted">Repeat password</label>
                            <input type="password" className="form-control" name="second_password" value={this.state.tryPassword} onChange={this.onChange} placeholder="*******" />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Sign up</button>
                    </form>
                </div>
            </div>
            );
    }
}