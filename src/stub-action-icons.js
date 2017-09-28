import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import axios from './axios';
import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
import {EditTicketStubDetails} from './edit-ticket-stub';
import {MoreStubActions} from './more-ticket-stub';

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
        this.state = {
            showEventEditor: false,
        };

        this.showEventEditor = this.showEventEditor.bind(this);
        this.closeEventEditor = this.closeEventEditor.bind(this);
    }


    showEventEditor(){
        // console.log("klick und showEventEditor aktiviert");
        this.setState({
            showEventEditor: true
        });
    }

    closeEventEditor(){
        // console.log("klick und closeEventEditor aktiviert");
        this.setState({
            showEventEditor: false
        });
    }

    render() {
        console.log("render EditIcon Comp with this.props:", this.props);

        var editIcon = <img
            className="icon-edit-ticketstub"
            src="/img/pencil-edit.svg"
            alt= "icon edit"
            onClick={this.showEventEditor}
        />;

        return (
            <div>
                {editIcon}

                {this.state.showEventEditor && <EditTicketStubDetails
                    showEventEditor={this.showEventEditor}
                    closeEventEditor={this.closeEventEditor}
                    id={this.props.id}
                    event={this.props.event}
                    date={this.props.date}
                    time={this.props.time}
                    venue={this.props.venue}/>}
            </div>

        );
    }
}

export class MoreIcon extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            showMoreMenu: false
        };

        this.showMoreMenu = this.showMoreMenu.bind(this);
        this.closeMoreMenu = this.closeMoreMenu.bind(this);
    }


    showMoreMenu(){
        // console.log("klick und showMoreMenu aktiviert");
        this.setState({
            showMoreMenu: true
        });
    }

    closeMoreMenu(){
        // console.log("klick und closeMoreMenu aktiviert");
        this.setState({
            showMoreMenu: false
        });
    }

    render() {

        // console.log(this.props);
        var moreIcon = <img
            className="icon-more-ticketstub"
            src="/img/more.svg"
            alt= "icon more"
            onClick={this.showMoreMenu}
        />;

        return (
            <div>
                {moreIcon}

                {this.state.showMoreMenu && <MoreStubActions
                    showMoreMenu={this.showMoreMenu}
                    closeMoreMenu={this.closeMoreMenu}
                    id={this.props.id}/>}
            </div>

        );
    }
}


export class UploadedTicketIcons extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            hover: true,
        };
    }

    render() {
        console.log("render UploadedTicketIcons Comp with this.props:", this.props);
        return (

            <div
                onClick={this.props.closeMoreMenu}>
                <DragIcon />
                <EditIcon
                    id={this.props.id}
                    event={this.props.event}
                    date={this.props.date}
                    time={this.props.time}
                    venue={this.props.venue}/>
                <MoreIcon id={this.props.id}/>
            </div>

        );
    }
}

export class BlankTicketIcons extends React.Component{
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
