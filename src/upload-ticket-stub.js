import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import axios from './axios';


export class AddIcon extends React.Component{
    constructor (props) {
        super(props);
    }
    render() {

        return (
            <img
                className="icon-add-ticketstub"
                src="/img/add.svg"
                alt= "icon add ticket stub"
                onClick={this.props.showUploader}
            />
        );
    }
}


export class UploadTicketStub extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        // console.log("React Component - UploadTicketStub - this.props: ", this.props);

        return (

            <div>

                <input type="text" name="event" placeholder="Event" onChange={this.props.handleInputChange} />
                <input type="text" name="date" placeholder="Date" onChange={this.props.handleInputChange} />
                <input type="text" name="time" placeholder="Time" onChange={this.props.handleInputChange} />
                <input type="text" name="venue" placeholder="Venue" onChange={this.props.handleInputChange} />

                <input
                    name="ticketstub"
                    type="file"
                    onChange = {this.props.handleFileChange}
                />
                <button
                    onClick={this.props.submitTicketStub} >Upload Stub</button>
                <button
                    onClick={this.props.hideUploader} >Cancel</button>
            </div>
        );
    }
}
