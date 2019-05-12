import React from 'react'
import Book from './Book'
import Progress from './Progress'

export default class Board extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId || 0,
            book: props.book || {},
            progress: props.progress || []
        };

    }

    render() {
        return (
            <div>
                <Book key={this.state.book.id} name={this.state.book.name}
                    author={this.state.book.author} cover={this.state.book.author} />
                <div>
                    {
                        this.state.progress.map(p => {
                            <Progress key={p.id} day={p.day} task={p.task} done={p.done}/>
                        })
                    }
                </div>
            </div>
            );
    }
}