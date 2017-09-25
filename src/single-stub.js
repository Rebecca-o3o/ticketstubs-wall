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

        const randomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        return (

            <li
                className="single-ticketstub"
                style={{backgroundColor: randomColor()}}>SingleStubComp

                <img
                    src={this.props.imgsrc}
                    alt={`stub ID ${this.props.id}`}
                />

                <img className="icon-move-object" src="/img/move-object.svg" alt= "icon move object"/>

                {/* <AddIcon
                    showUploader={this.props.howUploader}
                /> */}

                <img className="icon-edit-ticketstub" src="/img/pencil-edit.svg" alt= "icon add ticket stub"/>

            </li>

        );
    }
}


function mapStateToProps(state){
    console.log("you are at mapStateToProps of Comp SingleStub");
    return {
        stubs: state.stubs
    };
}

export default connect(mapStateToProps)(SingleStub);
