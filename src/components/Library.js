import React from 'react'
import $ from 'jquery'
import { Route, Redirect } from 'react-router'
import Book from './Book'
import AddBook from './AddBook'
import './Library.css'

export default class Library extends React.Component {
    static displayName = Library.name;

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }

        this.changeState = this.changeState.bind(this);
        this.add = this.add.bind(this);

        fetch('https://reading-organizer.azurewebsites.net/api/books')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ books: data });
            })
    }

    changeState(e) {
        e.preventDefault();
        if (e.target.id == 'books-tab') {
            $("#books").css("display", "inherit");
            $("#add-book").css("display", "none");
        } else {
            $("#books").css("display", "none");
            $("#add-book").css("display", "inherit");
        }
    }

    add(book) {
        let books = this.state.books;
        books.push(book);
        this.setState({ books: books });
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row">
                    <div className="btn-group">
                        <button className="btn btn-warning" id="books-tab" onClick={this.changeState}>Books</button>
                        <button className="btn btn-warning" id="add-books-tab" onClick={this.changeState}>Add book</button>
                    </div>
                </div>
                <div className="row">
                    <div className="row" id="books" style={{ display: 'line' }}>
                        {this.state.books.map((b, index) => {
                            return <Book key={b.id} {...b} />
                        })}
                    </div>
                    <div className="row" id="add-book" style={{display: 'none'}}>
                        <AddBook add={this.add}/>
                    </div>
                </div>
                    <button></button>
            </div>
            )
    }
}