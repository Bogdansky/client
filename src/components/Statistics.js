import React, { Fragment } from 'react'
import { Redirect } from 'react-router';
import { Modal } from 'react-bootstrap'
import ReactHighcharts from 'react-highcharts'
import $ from 'jquery'

export default class AddBook extends React.Component {
    static displayName = AddBook.name;

    constructor(props) {
        super(props);

        this.state = {
            userId: localStorage.getItem("userId"),
            config: [],
            show: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.processData = this.processData.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: `https://reading-organizer.azurewebsites.net/api/users/${this.state.userId}/stats`,
            dataType: "json",
            contentType: "application/json",
            success: res => {
                console.log(res);
                let data = this.processData(res);
                console.log(data);
                let config = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Pages on the months'
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -45,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Pages'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: 'Pages in this month: <b>{point.y:.1f} pages</b>'
                    },
                    series: [{
                        name: 'Population',
                        data: data,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.1f}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                };
                this.setState({ show: true, config: config });
            },
            error: data => console.error(data)
        });
    }

    processData(data) {
        return data.map(element => {
            let newElement = [];
            newElement.push(element.month);
            newElement.push(element.pages);
            return newElement;
        });
    }

    handleClose(e) {
        this.setState({ show: false });
    }

    handleSubmit(e) {
        //
        e.preventDefault();
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
            url: "https://localhost:44326/api/books",
            data: JSON.stringify(body),
            dataType: "json",
            contentType: "application/json",
            success: res => this.setState({ show: false }, this.props.add(res)),
            error: data => console.log(data)
        })
    }

    render() {
        return this.state.userId ? (
            <Fragment>
                <button className="btn btn-special" id="add-books-tab" onClick={this.handleOpen} disabled={!this.state.userId}>Show statistics</button>
                <Modal show={this.state.show}>
                    <Modal.Header>
                        <h3>Reading statistics</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactHighcharts config={this.state.config} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.handleClose} className="btn btn-danger">Close</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        ) : (<Redirect to="/signin" />);
    }
}