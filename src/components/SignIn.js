import React from 'react'
import { Route, Redirect } from 'react-router'

export class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            error: false
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
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
            fetch(`https://localhost:44326/api/users/signin`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.token) {
                    localStorage.setItem("userId", data.id);
                    localStorage.setItem("token", data.token);
                    this.setState({ loggedIn: true });

                } else if (data.statusCode && data.message) {
                    this.handleError(data.statusCode, data.message);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        catch(e){
            console.log('ќшибка');
        }
    }

    handleError(statusCode, message) {
        localStorage.setItem("statusCode", statusCode);
        localStorage.setItem("message", statusCode == 400 ? `${message}. Maybe, incorrect email or password` :  message);
        this.setState({ error: true });
    }

    onChange(e) {
        if (e.target.type === "email")
            this.setState({
                email: e.target.value
            })
        else if (e.target.type === "password") {
            this.setState({
                password: e.target.value
            });
        }

    }

    render() {
        return this.state.error ?
            (<Redirect to='/error' />)
            :
            this.state.loggedIn ?
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
                                <input type="password" className="form-control" value={this.state.password} onChange={this.onChange} placeholder="*******" required />
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Log in</button>
                        </form>
                    </div>
                </div>
            );
    }
}