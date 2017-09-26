import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
import {loadTicketstubs} from './actions';
import {DragIcon, EditIcon} from './stub-action-icons';

//===== components =====//

export class SingleStub extends React.Component{
    constructor(props){
        super(props);
        // this.handleHover = this.handleHover.bind(this);
    }


    // handleHover(){
    //     this.setState({
    //         isHovered: !this.state.isHovered
    //     });
    // }

    render() {

        // const stubHover = this.state.isHovered ? "pulse animated" : "";
        // return <button className={stubHover} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}></button>

        // const randomColor = () => {
        //     var letters = '0123456789ABCDEF';
        //     var color = '#';
        //     for (var i = 0; i < 6; i++) {
        //         color += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return color;
        // };

        // console.log(this.props);

        return (

            <div
                className="box no-cursor single-ticketstub"
                style={`content: url('https://s3.amazonaws.com/rkticketstubswall/3WxOcqaVjYPY44I0ANlRqIZCPeKgOLv4.jpg'}`}
            >
                {/*
                {this.props.id}
                {this.props.stubEvent}
                {this.props.stubDate}
                {this.props.stubTime}
                {this.props.stubVenue} */}

                {/* <img
                    src={this.props.stubImgSrc}
                    alt={`stub ID ${this.props.id}`}
                    className="box no-cursor single-ticketstub"
                    // className="box no-cursor"
                    // className={stubHover}
                    // onMouseEnter={this.handleHover}
                    // onMouseLeave={this.handleHover}
                /> */}
                <DragIcon />
                <EditIcon />
            </div>
            
            // <li
            //     className="single-ticketstub"
            //     // style={{backgroundColor: randomColor()}}
            //     >SingleStubComp
            //
            //     <img
            //         src={this.props.stubImgUrl}
            //         alt={`stub ID ${this.props.id}`}
            //     />
            //
            //     <DragIcon >
            //
            //     {/* <AddIcon
            //         showUploader={this.props.howUploader}
            //     /> */}
            //
            //     <img className="icon-edit-ticketstub" src="/img/pencil-edit.svg" alt= "icon add ticket stub"/>
            //
            // </li>

        );
    }
}


function mapStateToProps(state){

    return {
        stubs: state.stubs
    };
}

export default connect(mapStateToProps)(SingleStub);
