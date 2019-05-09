import React from 'react'

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            tryPassword: ""
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        alert(`${this.state.email}: ${this.state.password}`);
    }

    onChange(e) {
        if (e.target.type == "email")
            this.setState({
                email: e.target.value
            })
        else if (e.target.type == "password") {
            if (e.target.name == "first_password") {
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
        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <form className="col-12" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-text text-muted">Email</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.onChange} placeholder="example@mail.com" required />
                        </div>
                        <div class="form-group">
                            <label className="form-text text-muted">Password</label>
                            <input type="password" className="form-control" name="first_password" value={this.state.password} onChange={this.onChange} placeholder="*******" required />
                        </div>
                        <div class="form-group">
                            <label className="form-text text-muted">Repeat password</label>
                            <input type="password" className="form-control" name="second_password" value={this.state.password} onChange={this.onChange} placeholder="*******" />
                        </div>
                        <button className="btn btn-outline-primary">Sign up</button>
                    </form>
                </div>
            </div>
            );
    }
}