import React from 'react'
import { Route, Redirect } from 'react-router';
import Library from './Library'
import Board from './Board'
import './Main.css'

export class Main extends React.Component {
    static displayName = Main.name;

    constructor(props){
        super(props);
        
        this.state = {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            bookProgress: [],
            error: false
        };

        this.loadProgress = this.loadProgress.bind(this);
        this.handleError = this.handleError.bind(this);

        this.loadProgress();
    }

    loadProgress() {
        let authorizationHeader = { "Authorization": `Bearer ${this.state.token}` };
        let options = {
            method: "GET",
            mode: 'cors',   
            headers: authorizationHeader
        };

        fetch(`https://localhost:44326/api/users/${this.state.userId}/books`, options)
            .then(response => {
                if (response.status > 399) {
                    this.handleError(response.status, response.statusText);
                }
                return response;
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.Message && data.StatusCode) {
                    this.setState({
                        error: true
                    });
                    localStorage.setItem("statusCode", data.StatusCode);
                    localStorage.setItem("message", data.Message);
                } else {
                    this.setState({
                        bookProgress: data.bookProgress
                    });
                }
            })
            .catch(error => console.log(error));    
    }

    handleError(statusCode, message) {
        localStorage.setItem("statusCode", statusCode);
        localStorage.setItem("message", message);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) return (
            <Redirect to='/error' />
        );

        return this.state.bookProgress.length == 0
            ?
            (
                <div>
                    You not reading anything yet. Maybe you would want to choose some from this.
                    <Library key={new Date().getMilliseconds()} />
                </div>
            )
            :
            <div id="boards">
                {this.state.bookProgress.map(p => {
                    return <Board key={p.book.id} userId={this.state.userId} book={p.book} progress={p.progress} />
                })}
                <button></button>
            </div>
    }
}