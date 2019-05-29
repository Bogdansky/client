import React from 'react'
import $ from 'jquery'

export default class AddBook extends React.Component {
    static displayName = AddBook.name;

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        //
        e.preventDefault();
        let form = new FormData();
        let name = document.getElementById("inputName").value,
            author = document.getElementById("inputAuthor").value,
            pages = document.getElementById("inputPages").value;

        let body = {
            "Name": name,
            "Author": author,
            "Cover": "",
            "NumberOfPages": pages
        }

        $.ajax({
            type: "POST",
            url: "https://reading-organizer.azurewebsites.net/api/books",
            data: JSON.stringify(body),
            dataType: "json",
            contentType: "application/json",
            success: res => this.props.add(res),
            error: data => console.log(data)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ width: "300px", paddingLeft: "10px", paddingTop: "10px" }}>
                <div className="form-row w-100 border border-light rounded">
                    <div className="col">
                        <label htmlFor="inputName">Book name</label>
                        <input type="text" className="form-control" id="inputName" name="Name" placeholder="Name" />
                        <small id="emailHelp" className="form-text text-muted">Enter name of book there</small>
                    </div>
                    <div className="col">
                        <label htmlFor="inputAuthor">Number of pages</label>
                        <input type="text" className="form-control" id="inputAuthor" name="Author" placeholder="Name" />
                        <small id="emailHelp" className="form-text text-muted">Enter author of book there</small>
                    </div>
                    <div className="col">
                        <label htmlFor="inputNumber">Author</label>
                        <input type="number" min="1" className="form-control" id="inputPages" name="NumberOfPages" placeholder="111" />
                        <small className="form-text text-muted">Number of pages</small>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            );
    }
}