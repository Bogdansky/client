import React from 'react'

export class Main extends React.Component {
    static displayName = Main.name;

    constructor(props){
        super(props);
        
        this.state = {
            userId: props.userId,
            progress: []
        };

        fetch(`https://localhost:44326/api/users/${this.state.userId}/books`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                progress: data.progress
            });
        })
    }
}