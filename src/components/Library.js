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

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);

        fetch('https://reading-organizer.azurewebsites.net/api/books')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ books: data });
            })
    }

    add(book) {
        let books = this.state.books;
        console.log(JSON.stringify(book)+' added');
        books.push(book);
        this.setState({ books: books });
    }

    remove(book) {
        let books = this.state.books;
        console.log(JSON.stringify(book) + ' removed');
        delete books[books.lastIndexOf(book)];
        this.setState({ books: books });
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row">
                    <AddBook add={this.add}/>
                </div>
                <div className="row" style={{ display: 'line' }}>
                    {this.state.books.map((b, index) => {
                        return <Book key={b.id} {...b} remove={this.remove} />
                    })}
                </div>
            </div>
            )
    }
}