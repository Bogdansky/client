import React, { Component } from 'react';
import AddUserInfo from './AddUserInfo'

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            userInfo: localStorage.getItem('userinfo'),
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        };

        this.setUserInfo = this.setUserInfo.bind(this);
    }

    setUserInfo(info) {
        console.log(info.name);
        this.setState({ userInfo: info });
        localStorage.setItem('userinfo', info);
    }

    render() {
        console.log(this.state.userInfo);
    return (
        <div>
            <h1>Hello{this.state.userId ? this.state.userInfo.name && this.state.userInfo.surname ? `, ${this.state.userInfo.name} ${this.state.userInfo.surname}` : ', Unnamed User' : ', stranger'}!</h1>
            {this.state.userId && !(this.state.userInfo.name && this.state.userInfo.surname) ?
                <AddUserInfo setUserInfo={this.setUserInfo} /> : ""               
            }
      </div>
    );
  }
}
