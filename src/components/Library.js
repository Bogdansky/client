import React from 'react'
import $ from 'jquery'
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

        this.changeState = this.changeState.bind(this);

        fetch('https://localhost:44326/api/books')
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
                    <div className="row" id="books" style={{ display: 'line', overflow: 'visible', scrollbarColor: 'black' }}>
                        {this.state.books.map((b, index) => {
                            return <Book key={b.id} {...b} />
                        })}
                    </div>
                    <div className="row justify-content-center align-items-center" id="add-book" style={{ display: 'none'}}>
                        <form className="col-12">
                            <div className="form-group">
                                <label htmlFor="inputName">Name</label>
                                <input type="text" className="form-control" id="inputName" placeholder="Name"/>
                                <small id="emailHelp" className="form-text text-muted">Enter name of book there</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAuthor">Author</label>
                                <input type="text" className="form-control" id="inputAuthor" placeholder="Name" />
                                <small id="emailHelp" className="form-text text-muted">Enter author of book there</small>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label>Cover</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" className="form-control" id="byUpload" />
                                    <label className="form-check-label">Upload file</label>
                                </div>
                                <div className="form-group" id="byUrl">
                                    <input type="url" className="form-control" id="inputCover" placeholder="https://example.com/1.jpg" />
                                    <small className="form-text text-muted">Enter the url of the picture</small>
                                </div>
                                <div className="form-group" id="byUpload" style={{ display: 'none' }}>
                                    <input type="file" className="form-control-file" id="uploadFile" />
                                    <small className="form-text text-muted"></small>
                                </div>
                                <input type="text" className="form-control" id="inputCover" placeholder="Name" />
                                <small id="emailHelp" className="form-text text-muted">Enter name of book there</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputNumber">Number of pages</label>
                                <input type="number" min="1" className="form-control" id="inputNumber" placeholder="111" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
                        )
                }
}