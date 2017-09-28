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
    }

    // displayDetails(){
    //
    // }

    submitChange(){
        // console.log("about to change id:", this.props.id);
        console.log("this.props", this.props);

        var stubId = this.props.id;
        axios.post('/api/edit', {stubId}).then((res) => {
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


    render() {
        console.log("render EditTicketStubDetails Comp with this.props:", this.props);

        return (

            <div className="stub-edit-overlay">

                <div
                    className="x-close"
                    onClick={this.props.closeEventEditor} >x
                </div>

                <div className="inner-stub-editor">
                    <input type="text" name="event" placeholder="Event" onChange={this.props.handleInputChange} />
                </div>

                <div>
                    <input type="text" name="date" placeholder="Date" onChange={this.props.handleInputChange} />
                    <input type="text" name="time" placeholder="Time" onChange={this.props.handleInputChange} />
                </div>
                <div>
                    <input type="text" name="venue" placeholder="Venue" onChange={this.props.handleInputChange} />
                </div>

                <div>
                    <button
                        onClick={this.props.submitTicketStub} >Change</button>
                </div>

            </div>
        );
    }
}
