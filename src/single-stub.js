import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
import {loadTicketstubs} from './actions';


//===== components =====//

export class SingleStub extends React.Component{
    constructor(props){
        super(props);
    }


    render() {

        // const randomColor = () => {
        //     var letters = '0123456789ABCDEF';
        //     var color = '#';
        //     for (var i = 0; i < 6; i++) {
        //         color += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return color;
        // };

        console.log(this.props);

        return (

            <div>

                {this.props.id}
                {this.props.eventname}
                {this.props.eventdate}
                {this.props.eventtime}
                {this.props.venue}

                <img
                    src={this.props.stubImgSrc}
                    alt={`stub ID ${this.props.id}`}
                    className="single-ticketstub"
                />
            </div>
            //
            //
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
            //     <img className="icon-move-object" src="/img/move-object.svg" alt= "icon move object"/>
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
