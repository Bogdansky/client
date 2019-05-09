import React from 'react'
import './Book.css'

class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.key,
            name: this.props.name,
            author: this.props.author,
            cover: this.props.cover,
            pages: this.props.pages
        }

        this.getPages = this.getPages.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    getPages() {
        return `${this.state.pages} стр.`;
    }

    getStyle() {
        return `background-image: url(&quot;${this.state.cover}&quot;);`;
    }

    render() {
        return (
            //<div>
            //    <div className="book_cover">
            //        <img src={this.state.cover} alt=""/>
            //    </div>
                //<div className="book_description">
                //    <blockquote className="blockquote-reverse">
                //        <p>{this.state.name} ({this.getPages()})</p>
                //        <footer>{this.state.author}</footer>
                //    </blockquote>
                //</div>    
            //</div>
            <div className="t-col t-col_8 t-align_center t336__block t336__show_hover">
                <a href="#" target="_blank">
                    <div className="t336__table" style="height:550px;">
                        <div className="t336__cell t-align_center t-valign_middle">
                            <div className="t336__bg t336__animation_fast t336__bg_animated t-bgimg loaded" bgimgfield="img" data-original={this.state.cover} style={this.getStyle()} src=""></div>
                            <div className="t336__overlay t336__animation_fast" style="background-image: -moz-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70)); background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70)); background-image: -o-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70)); background-image: -ms-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70));"></div>
                            <div className="t336__textwrapper t336__animation_fast t336__textwrapper_animated">
                                <div className="t336__textwrapper__content" style="padding-bottom: 0px;">
                                    <div className="t336__title t-title t-title_md" style="" field="title">
                                        <div className="book_description">
                                            <blockquote className="blockquote-reverse">
                                                <p>{this.state.name} ({this.getPages()})</p>
                                                <footer>{this.state.author}</footer>
                                            </blockquote>
                                        </div>    
                                    </div>
                                    <div className="t336__button-container">
                                        <div className="t336__button-wrapper">
                                            <div className="t336__submit t-btn t-btn_sm" style="color:#000000;background-color:#ffffff;border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px;">Перейти на сайт</div>
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