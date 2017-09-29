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
            <div className="add-explanation-container">
                <img
                    className="icon-add-ticketstub"
                    src="/img/add.svg"
                    alt= "icon add ticket stub"
                    onClick={this.props.showUploader}
                />
                <div className="blank-text-explanation">Add a new stub to your wall by clicking on the add icon!</div>
            </div>
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

            <div className="modal">

                <div className="upload-container">

                    <div>
                        <input
                            type="text" name="event" placeholder="Event" onChange={this.props.handleInputChange}
                            style={{
                                width: '100%'
                            }}/>
                    </div>
                    <div>
                        <input
                            type="text" name="venue" placeholder="Venue" onChange={this.props.handleInputChange}
                            style={{
                                width: '100%'
                            }}/>

                    </div>

                    <div>
                        <input
                            type="text" name="date" placeholder="Date" onChange={this.props.handleInputChange}
                            style={{
                                width: '100px'
                            }} />
                        <input
                            type="text" name="time" placeholder="Time" onChange={this.props.handleInputChange}
                            style={{
                                width: '60px'
                            }}/>
                    </div>
                    <div>
                        <input
                            name="ticketstub"
                            type="file"
                            onChange = {this.props.handleFileChange}
                        />
                    </div>
                    <div>
                        <button
                            onClick={this.props.submitTicketStub}
                            className="uploader-button"
                             >Upload</button>
                            <button
                                onClick={this.props.hideUploader}
                                className="uploader-button"
                                 >Cancel</button>
                            </div>
                </div>

            </div>
        );
    }
}
