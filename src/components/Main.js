import React from 'react'
import { Route, Redirect } from 'react-router';
import Library from './Library'
import Board from './Board'

export class Main extends React.Component {
    static displayName = Main.name;

    constructor(props){
        super(props);
        
        this.state = {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            progress: [],
            error: false
        };

        this.loadProgress = this.loadProgress.bind(this);
        this.handleError = this.handleError.bind(this);
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
                        progress: data.bookProgress || []
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
        this.loadProgress();
        return (
            this.state.progress.length == 0 ?
                <div>
                    You not reading anything yet. Maybe you want to choose some from this.
                    <Library />
                </div>
                : this.state.progress.map(p =>
                <Board book={p.book} progress={p.progress} />
            )
        );
    }
}