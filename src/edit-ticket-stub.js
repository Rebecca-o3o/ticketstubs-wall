import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import axios from './axios';



export class EditTicketStubDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        // console.log("React Component - UploadTicketStub - this.props: ", this.props);

        return (

            <div className="stub-action-overlay">

                <div
                    className="x-close"
                    onClick={this.props.hideUploader} >x
                </div>
                <div>
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
                    <button
                        onClick={this.props.hideUploader} >Cancel</button>

                </div>

            </div>
        );
    }
}
