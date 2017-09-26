import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import axios from './axios';


export class DragIcon extends React.Component{
    constructor (props) {
        super(props);
    }
    render() {

        return (

            <div className="cursor">
            </div>

        );
    }
}


export class EditIcon extends React.Component{
    constructor (props) {
        super(props);
    }
    render() {

        return (

            <img
                className="icon-edit-ticketstub"
                src="/img/pencil-edit.svg"
                alt= "icon add ticket stub"
                // onClick={this.props.dostuff}
            />

        );
    }
}
