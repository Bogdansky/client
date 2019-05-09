import React from 'react'

class Progress extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            day: props.day,
            done: props.done,
            task: props.task,
            previousStatus: "",
            currentStatus: undefined
        }
        this.getClass = this.getClass.bind(this);
    }

    getClass(date, done){
        if (done){
            this.setState({currentStatus: "Выполнено"});
            return "col md-4 success";
        }
        else{
            let now = new Date();
            if (date > now){
                this.setState({currentStatus: "Ожидается"});
                return "col md-4 default";
            }
            this.setState({currentStatus: "Не выполнено"});
            return "col md-4 fail";
        }
    }

    render(){
        return (
            <div className="progress">
                <div className={this.getClass(this.state.day,this.state.done)}>
                    <div className="input-group date" data-provide="datepicker" data-date-end-date="+0d">
                        <input type="text" className="form-control" value={this.state.day}/>
                        <div className="input-group-addon">
                            <span className="glyphicon glyphicon-th"></span>
                        </div>
                    </div>
                    <a className="status btn">{this.state.currentStatus}</a>
                    <p className="pages">{this.state.task.pages}</p>
                </div>
            </div>
        )
    }
}

export default Progress;