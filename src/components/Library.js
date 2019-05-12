import React from 'react'
import { Route, Redirect } from 'react-router'
import Book from './Book'
import './Library.css'

export default class Library extends React.Component {
    static displayName = Library.name;

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }
        fetch('https://localhost:44326/api/books')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ books: data });
            })
    }

    render() {
        return (
            <div className="row">
                {this.state.books.map((b, index) => {
                    return <Book key={b.id} {...b} />
                })}
            </div>
            )
    }
}