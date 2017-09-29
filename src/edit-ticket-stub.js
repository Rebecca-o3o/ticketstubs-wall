import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
import axios from './axios';



export class EditTicketStubDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEventEditor: true
        };
        this.submitChange = this.submitChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    submitChange(){
        // console.log("submitChange this.props", this.props);

        // var [id, event, date, time, venue] = this.state;
        axios.post('/api/edit', {
            id: this.props.id,
            event: this.state.event,
            date: this.state.date,
            time: this.state.time,
            venue: this.state.venue
        }).then((res) => {
            console.log(res);
            this.setState({
                showEventEditor: false
            });
            location.replace("/");
        }).catch((err)=>{
            this.setState({
                error: 'Ups! Something went wrong! Please try again!'
            });
            console.log(err);
        });
    }

    handleClick(e){
        // console.log("handleClick this.props", this.props);
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        // console.log("render EditTicketStubDetails Comp with this.props:", this.props);

        return (

            <div className="stub-edit-overlay">

                <div
                    className="x-close"
                    onClick={this.props.closeEventEditor} >x
                </div>

                <div className="inner-stub-editor">
                    <input type="text" name="event" placeholder={`${this.props.event}`} onChange={this.handleClick} />
                </div>

                <div>
                    <input type="text" name="date" placeholder={`${this.props.date}`} onChange={this.handleClick} />
                    <input type="text" name="time" placeholder={`${this.props.time}`} onChange={this.handleClick} />
                </div>
                <div>
                    <input type="text" name="venue" placeholder={`${this.props.venue}`} onChange={this.handleClick} />
                </div>

                <div>
                    <button type="submit" name="submit" onClick={e => this.submitChange()}>Change</button>
                </div>

            </div>
        );
    }
}
