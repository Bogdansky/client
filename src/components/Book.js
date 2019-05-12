import React from 'react'
import { Route, Redirect } from 'react-router';
import './Book.css'

export default class Book extends React.Component {
    static displayName = Book.name;

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            name: this.props.name,
            author: this.props.author,
            cover: this.props.cover,
            pages: this.props.numberOfPages,
            days: 1,
            wantsToRead: false,
            reading: false,
            error: false
        }

        this.getPages = this.getPages.bind(this);
        this.getReadLink = this.getReadLink.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.letReadOrChangeMind = this.letReadOrChangeMind.bind(this);
    }

    getPages() {
        return `${this.state.pages} pages`;
    }

    getReadLink() {
        let userId = localStorage.getItem("userId") || 0;
        return `https://localhost:44326/api/users/${userId}/books/${this.state.id}?days=${this.state.days}`;
    }

    letReadOrChangeMind(e) {
        e.preventDefault();
        let value = this.state.wantsToRead;
        this.setState({ wantsToRead: !value });
    }

    changeNumber(e) {
        e.preventDefault();
        this.setState({ days: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let options = {
            method: "POST",
            mode: "cors"
        };
        fetch(this.getReadLink(), options)
            .then(response => {
                if (response > 399) {
                    localStorage.setItem("statusCode", response.status);
                    localStorage.setItem("message", response.statusText);
                    this.setState({ error: true });
                } else {
                    this.setState({ reading: true });
                }
            })
            .catch(error => {
                localStorage.setItem("message", error.message);
                this.setState({ error: true });
            });
    }

    render() {
        if (this.state.error) {
            return (<Redirect to='/error' />);
        }

        return this.state.reading ? 
            <Redirect to="/boards" />
            :
            this.state.wantsToRead ?
            (
                <form onSubmit={this.handleSubmit}>
                    <table className="infobox">
                        <tbody>
                            <tr className="header"><td colSpan={2}>{this.state.name}</td></tr>
                            <tr className="headerImage">
                                <td colSpan={2}>
                                    <a onClick={this.letReadOrChangeMind} target="_blank"><img src={this.state.cover} /></a>
                                </td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>{this.state.author}</td>
                            </tr>
                            <tr>
                                <th>Pages</th>
                                <td>{this.state.pages}</td>
                            </tr>
                            <tr>
                                <th>Choose number of days</th>
                                <td>
                                    <input className="form-control" type="number" min={1} max={this.state.pages} value={this.state.days} onChange={this.changeNumber} />
                                </td>
                             </tr>
                             <tr><td colSpan={2}><button className="btn btn-warning">Read</button></td></tr>
                        </tbody>
                    </table>
                </form>
            )
            :
            (
            <div className="t-col t-col_8 t-align_center t336__block t336__show_hover">
                <a onClick={this.letReadOrChangeMind} target="_blank">
                    <div className="t336__table">
                        <div className="t336__cell t-align_center t-valign_middle">
                            <div className="t336__bg t336__animation_fast t336__bg_animated t-bgimg loaded" bgimgfield="img" data-original={this.state.cover} style={{ backgroundImage: `url(${this.state.cover})` }} src=""></div>
                            <div className="t336__overlay t336__animation_fast"></div>
                            <div className="t336__textwrapper t336__animation_fast t336__textwrapper_animated">
                                <div className="t336__textwrapper__content">
                                    <div className="t336__title t-title t-title_md" field="title">
                                        <div className="book_description">
                                            <blockquote className="blockquote-reverse">
                                                <p>{this.state.name} ({this.getPages()})</p>
                                                <footer>{this.state.author}</footer>
                                            </blockquote>
                                        </div>    
                                    </div>
                                    <div className="t336__button-container">
                                        <div className="t336__button-wrapper">
                                            <div className="t336__submit t-btn t-btn_sm">Перейти на сайт</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            );
    }
}