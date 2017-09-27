import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import axios from './axios';



export class MoreStubActions extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        // console.log("React Component - UploadTicketStub - this.props: ", this.props);

        return (

            <div className="stub-action-overlay">

                <div
                    onClick={this.props.hideUploader} >x
                </div>

                <button
                    onClick={this.props.hideUploader}
                    className="button-delete" >Delete
                </button>

            </div>
        );
    }
}
